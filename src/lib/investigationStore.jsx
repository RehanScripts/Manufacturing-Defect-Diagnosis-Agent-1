import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  AGENT_STEPS,
  AUDIT_SEED,
  CORRECTIVE_ACTION_TEMPLATES,
  DIAGNOSTIC_CHECKS,
  HYPOTHESES_BY_DEFECT,
  MONITORING_BATCHES,
  SCENARIOS,
  buildHypothesis,
  getEvidenceItem,
  seedCases,
} from "@/lib/mockData";
import { SAMPLE_IMAGES } from "@/lib/assets";

const STORAGE_KEY = "mqi-demo-state-v2";
const InvestigationContext = createContext(null);

/* ---------------- simulated vision results ---------------- */

const VISION_RESULTS = {
  "Surface Scratches": {
    confidence: 94.2,
    bbox: { x: 0.3, y: 0.34, w: 0.34, h: 0.22 },
    findings: [
      "Linear scratch cluster on the machined top face, approximately 22 mm end to end.",
      "Four parallel marks with uniform spacing, oriented along the feed direction.",
      "No material discolouration or thermal signature around the marks.",
      "Estimated depth is shallow; depth cannot be measured from the image alone.",
    ],
  },
  "Dimensional Deviation": {
    confidence: 89.6,
    bbox: { x: 0.4, y: 0.38, w: 0.22, h: 0.2 },
    findings: [
      "Witness mark detected on the bore entry chamfer.",
      "No surface damage visible on the reference face.",
      "Dimensional deviation cannot be confirmed from an image; metrology record required.",
    ],
  },
  "Burr Formation": {
    confidence: 91.4,
    bbox: { x: 0.22, y: 0.5, w: 0.3, h: 0.18 },
    findings: [
      "Rolled burr detected at the pocket exit edge, continuous over 14 mm.",
      "No burr observed on the opposite edge.",
      "Edge condition suggests material smearing rather than clean shear.",
    ],
  },
  "Surface Cracks": {
    confidence: 87.3,
    bbox: { x: 0.46, y: 0.46, w: 0.22, h: 0.18 },
    findings: [
      "Branching discontinuity at the pocket corner, propagating into the wall.",
      "Coolant staining around the crack suggests a thermal contribution.",
      "Crack depth cannot be assessed from the image; penetrant inspection required.",
    ],
  },
};

const EVIDENCE_BY_DEFECT = {
  "Surface Scratches": ["EVD-101", "EVD-102", "EVD-103", "EVD-104", "EVD-105", "EVD-108", "EVD-109"],
  "Dimensional Deviation": ["EVD-110", "EVD-111", "EVD-115", "EVD-108", "EVD-105"],
  "Burr Formation": ["EVD-112", "EVD-113", "EVD-117", "EVD-114"],
  "Surface Cracks": ["EVD-116", "EVD-118", "EVD-120", "EVD-105"],
};

const HYPOTHESIS_EVIDENCE = {
  "Tool Wear": {
    support: ["EVD-102", "EVD-104", "EVD-111"],
    contradict: ["EVD-119", "EVD-103"],
    missing: ["Tool geometry measurement (CHK-01)"],
  },
  "Fixture Misalignment": {
    support: ["EVD-101", "EVD-106"],
    contradict: [],
    missing: ["Fixture alignment measurement (CHK-02)"],
  },
  "Incorrect Machining Parameters": {
    support: ["EVD-108", "EVD-117"],
    contradict: [],
    missing: ["Per-unit feed rate confirmation"],
  },
  "Material Inconsistency": {
    support: ["EVD-114"],
    contradict: ["EVD-103"],
    missing: ["Hardness re-test on retained coupons"],
  },
  "Coolant-Related Issue": {
    support: ["EVD-109", "EVD-116"],
    contradict: [],
    missing: ["Coolant flow measurement at the pocket corner"],
  },
  "Measurement Variation": {
    support: [],
    contradict: [],
    missing: ["Gauge R&R study for the workcell"],
  },
};

const clamp = (n) => Math.max(2, Math.min(96, Math.round(n)));

function makeId(prefix, existing) {
  const max = existing.reduce((m, id) => {
    const n = parseInt(String(id).split("-").pop(), 10);
    return Number.isFinite(n) ? Math.max(m, n) : m;
  }, 0);
  return `${prefix}${max + 1}`;
}

export function buildCase(data) {
  const now = new Date().toISOString();
  const category = data.defectCategory || "Surface Scratches";
  return {
    id: data.id,
    component: "Precision Metal Housing",
    componentId: data.componentId || "PMH-88213",
    batchId: data.batchId || "B-204",
    line: data.line || "Line 3 — CNC Cell 2",
    machineId: data.machineId || "CNC-07",
    inspectedAt: data.inspectedAt || now,
    defectCategory: category,
    severity: data.severity || "Medium",
    description: data.description || "",
    inspector: data.inspector || "A. Kulkarni",
    engineer: data.engineer || "R. Deshmukh",
    status: data.status || "Under Investigation",
    stage: data.stage || 2,
    imageUrl: data.imageUrl || SAMPLE_IMAGES[category],
    imageName: data.imageName || "inspection-image.png",
    vision: null,
    evidenceIds: [],
    evidenceReviews: {},
    evidenceRetrieved: false,
    hypotheses: [],
    checks: DIAGNOSTIC_CHECKS.map((check) => ({ ...check, status: "available", result: null })),
    diagnosis: null,
    diagnosisReview: null,
    previousHypotheses: null,
    actions: [],
    actionsApproved: false,
    actionsRejectedReason: null,
    monitoring: MONITORING_BATCHES.map((batchId) => ({
      batchId,
      inspections: "",
      defects: "",
      result: "",
      notes: "",
      completed: false,
    })),
    effectiveness: null,
    escalation: null,
    timeline: [
      {
        at: now,
        title: "Case created",
        detail: `${data.id} opened for ${category} on batch ${data.batchId || "B-204"}.`,
        actor: data.inspector || "A. Kulkarni",
        kind: "human",
      },
    ],
    createdAt: now,
    updatedAt: now,
  };
}

function draftActions(rootCause) {
  const template =
    CORRECTIVE_ACTION_TEMPLATES[rootCause] || CORRECTIVE_ACTION_TEMPLATES["Tool Wear"];
  return template.map((item, index) => ({
    id: `CA-${index + 1}`,
    description: item.description,
    owner: item.owner,
    priority: item.priority,
    dueDate: new Date(Date.now() + item.dueDays * 86400000).toISOString(),
    status: "Not Started",
    verification: item.verification,
  }));
}

function reviseHypotheses(hypotheses, check, outcome, evidenceId) {
  const supportDelta = 33;
  const contradictDelta = -34;
  const otherSupport = -18;
  const otherContradict = 14;
  return hypotheses.map((h) => {
    const isTarget = check.hypotheses.includes(h.name);
    let next = h.confidence;
    if (isTarget) {
      next = clamp(h.confidence + (outcome === "Supports hypothesis" ? supportDelta : outcome === "Contradicts hypothesis" ? contradictDelta : -6));
    } else if (outcome !== "Inconclusive") {
      next = clamp(h.confidence + (outcome === "Supports hypothesis" ? otherSupport : otherContradict));
    }
    return {
      ...h,
      previousConfidence: h.confidence,
      confidence: next,
      revised: true,
      supporting:
        isTarget && outcome === "Supports hypothesis" && evidenceId
          ? Array.from(new Set([...h.supporting, evidenceId]))
          : h.supporting,
      contradicting:
        isTarget && outcome === "Contradicts hypothesis" && evidenceId
          ? Array.from(new Set([...h.contradicting, evidenceId]))
          : h.contradicting,
      missing: isTarget ? h.missing.slice(1) : h.missing,
    };
  });
}

function buildDiagnosis(hypotheses) {
  const sorted = [...hypotheses].sort((a, b) => b.confidence - a.confidence);
  const top = sorted[0] || { name: "Unresolved", confidence: 0, supporting: [], contradicting: [], missing: [] };
  const second = sorted[1];
  const low = top.confidence < 55;
  const parts = [];
  parts.push(
    `The evidence points to ${top.name.toLowerCase()} ahead of ${second ? second.name.toLowerCase() : "the remaining hypotheses"}.`
  );
  if (top.supporting.length) {
    parts.push(`${top.supporting.length} record${top.supporting.length === 1 ? "" : "s"} support this hypothesis (${top.supporting.join(", ")}).`);
  }
  if (top.contradicting.length) {
    parts.push(`${top.contradicting.length} record${top.contradicting.length === 1 ? "" : "s"} contradict it (${top.contradicting.join(", ")}) and are retained in the assessment.`);
  }
  if (top.missing.length) {
    parts.push(`Remaining uncertainty: ${top.missing.join(", ").toLowerCase()}.`);
  }
  return {
    primary: top.name,
    confidence: top.confidence,
    status: low
      ? "Unresolved — Escalation Recommended"
      : top.confidence >= 80
        ? "Likely — Awaiting Engineer Verification"
        : "Probable — Awaiting Engineer Verification",
    supporting: top.supporting,
    contradicting: top.contradicting,
    summary: parts.join(" "),
    lowConfidence: low,
    generatedAt: new Date().toISOString(),
  };
}

function initialState() {
  return { cases: seedCases(), audit: AUDIT_SEED, notifications: [], agent: {} };
}

export function InvestigationProvider({ children }) {
  const [state, setState] = useState(initialState);
  const stateRef = useRef(state);
  stateRef.current = state;
  const hydrated = useRef(false);
  const timers = useRef([]);
  const activeRuns = useRef({});

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed?.cases) && parsed.cases.length) {
          setState({
            cases: parsed.cases,
            audit: parsed.audit?.length ? parsed.audit : AUDIT_SEED,
            notifications: parsed.notifications || [],
            agent: {},
          });
        }
      }
    } catch {
      /* ignore corrupted local state */
    }
    hydrated.current = true;
    return () => timers.current.forEach((t) => clearTimeout(t));
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ cases: state.cases, audit: state.audit, notifications: state.notifications })
      );
    } catch {
      /* storage full or unavailable */
    }
  }, [state.cases, state.audit, state.notifications]);

  const logAudit = useCallback((entry) => {
    setState((s) => ({
      ...s,
      audit: [
        {
          id: `AUD-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          at: new Date().toISOString(),
          status: "Completed",
          ...entry,
        },
        ...s.audit,
      ],
    }));
  }, []);

  const patchCase = useCallback(
    (caseId, patch, audit) => {
      const now = new Date().toISOString();
      setState((s) => ({
        ...s,
        cases: s.cases.map((c) =>
          c.id === caseId
            ? { ...c, ...(typeof patch === "function" ? patch(c) : patch), updatedAt: now }
            : c
        ),
      }));
      if (audit) logAudit({ caseId, ...audit });
    },
    [logAudit]
  );

  const addTimeline = useCallback(
    (caseId, entry, audit) => {
      const now = new Date().toISOString();
      setState((s) => ({
        ...s,
        cases: s.cases.map((c) =>
          c.id === caseId
            ? { ...c, timeline: [...c.timeline, { at: now, ...entry }], updatedAt: now }
            : c
        ),
      }));
      if (audit) logAudit({ caseId, ...audit });
    },
    [logAudit]
  );

  /* ---------------- agent activity ---------------- */

  const runAgent = useCallback((caseId, steps, onComplete) => {
    const runId = Date.now() + Math.random();
    activeRuns.current[caseId] = runId;
    setState((s) => ({
      ...s,
      agent: {
        ...s.agent,
        [caseId]: { runId, done: false, steps: steps.map((label) => ({ label, state: "pending" })) },
      },
    }));
    const mark = (index, value) =>
      setState((s) => {
        const run = s.agent[caseId];
        if (!run || run.runId !== runId) return s;
        return {
          ...s,
          agent: {
            ...s.agent,
            [caseId]: {
              ...run,
              steps: run.steps.map((step, i) => (i === index ? { ...step, state: value } : step)),
            },
          },
        };
      });
    let t = 0;
    steps.forEach((_, index) => {
      t += 350;
      timers.current.push(setTimeout(() => mark(index, "running"), t));
      t += 460;
      timers.current.push(setTimeout(() => mark(index, "completed"), t));
    });
    timers.current.push(
      setTimeout(() => {
        if (activeRuns.current[caseId] !== runId) return;
        setState((s) => {
          const run = s.agent[caseId];
          if (!run || run.runId !== runId) return s;
          return { ...s, agent: { ...s.agent, [caseId]: { ...run, done: true } } };
        });
        onComplete?.();
      }, t + 280)
    );
  }, []);

  /* ---------------- case lifecycle ---------------- */

  const createCase = useCallback(
    (data, options = {}) => {
      const cases = stateRef.current.cases;
      const max = cases.reduce((m, c) => {
        const n = parseInt(String(c.id).split("-").pop(), 10);
        return Number.isFinite(n) ? Math.max(m, n) : m;
      }, 41);
      const id = `MQI-2026-${String(max + 1).padStart(4, "0")}`;
      const newCase = buildCase({
        ...data,
        id,
        stage: options.draft ? 1 : 2,
        status: options.draft ? "Draft" : "Under Investigation",
      });
      setState((s) => ({ ...s, cases: [newCase, ...s.cases] }));
      logAudit({
        caseId: id,
        action: options.draft ? "Draft saved" : "Case created",
        actor: newCase.inspector,
        actorType: "Human",
        description: `${options.draft ? "Draft saved for" : "New investigation opened:"} ${newCase.defectCategory} on ${newCase.componentId}, batch ${newCase.batchId}.`,
        status: "Completed",
      });
      return newCase;
    },
    [logAudit]
  );

  const startInvestigation = useCallback(
    (caseId) => {
      const current = stateRef.current.cases.find((c) => c.id === caseId);
      if (!current) return null;
      const next = { ...current, status: "Under Investigation", stage: 2 };
      patchCase(caseId, next, {
        action: "Case created",
        actor: current.inspector,
        actorType: "Human",
        description: `Investigation ${caseId} started for ${current.defectCategory} on batch ${current.batchId}.`,
      });
      return next;
    },
    [patchCase]
  );

  const runVision = useCallback(
    (caseId, onDone) => {
      const current = stateRef.current.cases.find((c) => c.id === caseId);
      if (!current) return;
      runAgent(caseId, AGENT_STEPS.vision, () => {
        const base = VISION_RESULTS[current.defectCategory] || VISION_RESULTS["Surface Scratches"];
        const vision = {
          category: current.defectCategory,
          severity: current.severity,
          confidence: base.confidence,
          bbox: base.bbox,
          findings: base.findings,
          simulated: true,
        };
        patchCase(caseId, {
          vision,
          stage: Math.max(current.stage, 2),
          status: current.status === "Draft" ? "Under Investigation" : current.status,
        });
        addTimeline(
          caseId,
          {
            title: "Image analysis completed",
            detail: `${vision.category} detected at ${vision.confidence}% illustrative confidence, severity ${vision.severity}.`,
            actor: "AI Investigation Agent",
            kind: "agent",
          },
          {
            action: "Image analysis completed",
            actor: "AI Investigation Agent",
            actorType: "Agent",
            description: `${vision.category} detected at ${vision.confidence}% illustrative confidence.`,
          }
        );
        onDone?.();
      });
    },
    [addTimeline, patchCase, runAgent]
  );

  const retrieveEvidence = useCallback(
    (caseId, onDone) => {
      const current = stateRef.current.cases.find((c) => c.id === caseId);
      if (!current) return;
      runAgent(caseId, AGENT_STEPS.evidence, () => {
        const ids = EVIDENCE_BY_DEFECT[current.defectCategory] || EVIDENCE_BY_DEFECT["Surface Scratches"];
        const sourceCount = new Set(
          ids.map((id) => getEvidenceItem(id)?.sourceType).filter(Boolean)
        ).size;
        patchCase(caseId, {
          evidenceIds: ids,
          evidenceRetrieved: true,
          stage: Math.max(current.stage, 3),
        });
        addTimeline(
          caseId,
          {
            title: "Evidence retrieved",
            detail: `${ids.length} records retrieved across ${sourceCount} source types.`,
            actor: "AI Investigation Agent",
            kind: "agent",
          },
          {
            action: "Evidence retrieved",
            actor: "AI Investigation Agent",
            actorType: "Agent",
            description: `${ids.length} production, machine, material and procedure records retrieved.`,
          }
        );
        onDone?.();
      });
    },
    [addTimeline, patchCase, runAgent]
  );

  const generateHypotheses = useCallback(
    (caseId, onDone) => {
      const current = stateRef.current.cases.find((c) => c.id === caseId);
      if (!current) return;
      runAgent(caseId, AGENT_STEPS.hypotheses, () => {
        const template = HYPOTHESES_BY_DEFECT[current.defectCategory] || HYPOTHESES_BY_DEFECT["Surface Scratches"];
        const hypotheses = template.map(([name, confidence]) => {
          const map = HYPOTHESIS_EVIDENCE[name] || { support: [], contradict: [], missing: [] };
          return buildHypothesis(
            name,
            confidence,
            map.support.filter((id) => current.evidenceIds.includes(id)),
            map.contradict.filter((id) => current.evidenceIds.includes(id)),
            map.missing
          );
        });
        patchCase(caseId, { hypotheses, stage: Math.max(current.stage, 4) });
        addTimeline(
          caseId,
          {
            title: "Hypotheses generated",
            detail: `${hypotheses.length} competing hypotheses scored; ${hypotheses[0].name} leading at ${hypotheses[0].confidence}%.`,
            actor: "AI Investigation Agent",
            kind: "agent",
          },
          {
            action: "Hypothesis generated",
            actor: "AI Investigation Agent",
            actorType: "Agent",
            description: `${hypotheses.length} hypotheses scored against the retrieved evidence set.`,
          }
        );
        onDone?.();
      });
    },
    [addTimeline, patchCase, runAgent]
  );

  const recommendCheck = useCallback(
    (caseId, onDone) => {
      const current = stateRef.current.cases.find((c) => c.id === caseId);
      if (!current) return;
      runAgent(caseId, AGENT_STEPS.check, () => {
        patchCase(caseId, { stage: Math.max(current.stage, 5) });
        addTimeline(
          caseId,
          {
            title: "Diagnostic check recommended",
            detail: "CHK-01 Inspect Tool Geometry recommended as the most informative next check.",
            actor: "AI Investigation Agent",
            kind: "agent",
          },
          {
            action: "Diagnostic check recommended",
            actor: "AI Investigation Agent",
            actorType: "Agent",
            description: "CHK-01 Inspect Tool Geometry recommended; awaiting engineer approval.",
          }
        );
        onDone?.();
      });
    },
    [addTimeline, patchCase, runAgent]
  );

  const approveCheck = useCallback(
    (caseId, checkId) => {
      const current = stateRef.current.cases.find((c) => c.id === caseId);
      if (!current) return;
      const check = current.checks.find((c) => c.id === checkId);
      const checks = current.checks.map((c) =>
        c.id === checkId ? { ...c, status: c.status === "approved" ? "approved" : "approved" } : c
      );
      patchCase(caseId, { checks, stage: Math.max(current.stage, 5) });
      addTimeline(
        caseId,
        {
          title: "Diagnostic check approved",
          detail: `${checkId} ${check?.name} approved and released to ${check?.engineer}.`,
          actor: current.engineer,
          kind: "human",
        },
        {
          action: "Diagnostic check approved",
          actor: current.engineer,
          actorType: "Human",
          description: `${checkId} ${check?.name} approved; status set to Approved — Awaiting Result.`,
        }
      );
    },
    [addTimeline, patchCase]
  );

  const rejectCheck = useCallback(
    (caseId, checkId) => {
      const current = stateRef.current.cases.find((c) => c.id === caseId);
      if (!current) return;
      patchCase(caseId, {
        checks: current.checks.map((c) => (c.id === checkId ? { ...c, status: "rejected" } : c)),
      });
      addTimeline(caseId, {
        title: "Diagnostic check rejected",
        detail: `${checkId} was rejected by the engineer.`,
        actor: current.engineer,
        kind: "human",
      });
      logAudit({
        caseId,
        action: "Diagnostic check rejected",
        actor: current.engineer,
        actorType: "Human",
        description: `${checkId} rejected; the agent will propose an alternative.`,
      });
    },
    [addTimeline, logAudit, patchCase]
  );

  const submitCheckResult = useCallback(
    (caseId, checkId, { outcome, notes }, onDone) => {
      const current = stateRef.current.cases.find((c) => c.id === caseId);
      if (!current) return;
      runAgent(caseId, AGENT_STEPS.revise, () => {
        const check = current.checks.find((c) => c.id === checkId);
        if (!check) return;
        const evidenceId = check.resultEvidenceId;
        const checks = current.checks.map((c) =>
          c.id === checkId
            ? {
                ...c,
                status: "completed",
                result: {
                  outcome,
                  notes,
                  at: new Date().toISOString(),
                  by: current.engineer,
                },
              }
            : c
        );
        const evidenceIds = evidenceId
          ? Array.from(new Set([...current.evidenceIds, evidenceId]))
          : current.evidenceIds;
        const hypotheses = current.hypotheses.length
          ? reviseHypotheses(current.hypotheses, check, outcome, evidenceId)
          : current.hypotheses;
        const diagnosis = hypotheses.length ? buildDiagnosis(hypotheses) : current.diagnosis;
        patchCase(caseId, {
          checks,
          evidenceIds,
          evidenceReviews: evidenceId
            ? { ...current.evidenceReviews, [evidenceId]: "Relevant" }
            : current.evidenceReviews,
          previousHypotheses: current.hypotheses,
          hypotheses,
          diagnosis,
          stage: diagnosis ? Math.max(current.stage, 6) : current.stage,
        });
        addTimeline(
          caseId,
          {
            title: "Diagnostic result entered",
            detail: `${check?.name}: ${outcome.toLowerCase()}${notes ? ` — ${notes}` : ""}`,
            actor: current.engineer,
            kind: "human",
          },
          {
            action: "Diagnostic result entered",
            actor: current.engineer,
            actorType: "Human",
            description: `${checkId} ${check?.name} result recorded as "${outcome}".`,
          }
        );
        if (diagnosis) {
          addTimeline(
            caseId,
            {
              title: "Hypotheses revised",
              detail: `Leading hypothesis is now ${diagnosis.primary} at ${diagnosis.confidence}% (illustrative).`,
              actor: "AI Investigation Agent",
              kind: "agent",
            },
            {
              action: "Hypothesis revised",
              actor: "AI Investigation Agent",
              actorType: "Agent",
              description: `Confidence updated across ${hypotheses.length} hypotheses; ${diagnosis.primary} now leading.`,
            }
          );
        }
        onDone?.();
      });
    },
    [addTimeline, patchCase, runAgent]
  );

  const reviewDiagnosis = useCallback(
    (caseId, action, payload = {}) => {
      const current = stateRef.current.cases.find((c) => c.id === caseId);
      if (!current) return;
      const now = new Date().toISOString();
      if (action === "approve") {
        const primary = current.diagnosis?.primary || current.hypotheses?.[0]?.name;
        if (!primary) return;
        const actions = current.actions.length ? current.actions : draftActions(primary);
        patchCase(
          caseId,
          {
            diagnosisReview: { state: "approved", at: now, by: current.engineer },
            status: "Diagnosis Approved",
            stage: 7,
            actions,
          },
          {
            action: "Diagnosis approved",
            actor: current.engineer,
            actorType: "Human",
            description: `${primary} approved as the root cause; corrective action drafting started.`,
          }
        );
        addTimeline(caseId, {
          title: "Diagnosis approved",
          detail: `${primary} approved by ${current.engineer}.`,
          actor: current.engineer,
          kind: "human",
        });
        return;
      }
      if (action === "reject") {
        patchCase(
          caseId,
          {
            diagnosisReview: { state: "rejected", at: now, by: current.engineer, reason: payload.reason },
            status: "Under Investigation",
            stage: 4,
            checks: current.checks.map((c) =>
              c.status === "completed" ? { ...c, status: "available" } : c
            ),
          },
          {
            action: "Diagnosis rejected",
            actor: current.engineer,
            actorType: "Human",
            description: `Diagnosis rejected: ${payload.reason || "no reason recorded"}. Returned to investigation.`,
          }
        );
        addTimeline(caseId, {
          title: "Diagnosis rejected",
          detail: payload.reason || "No reason recorded.",
          actor: current.engineer,
          kind: "human",
        });
        return;
      }
      if (action === "more_evidence") {
        patchCase(caseId, { stage: 5, diagnosisReview: { state: "more_evidence", at: now } });
        addTimeline(
          caseId,
          {
            title: "Additional evidence requested",
            detail: "Returned to diagnostic check selection for further evidence.",
            actor: current.engineer,
            kind: "human",
          },
          {
            action: "Additional evidence requested",
            actor: current.engineer,
            actorType: "Human",
            description: "Investigation returned to diagnostic check selection.",
          }
        );
        return;
      }
      if (action === "escalate") {
        patchCase(
          caseId,
          {
            status: "Escalated",
            escalation: {
              reason: payload.reason || "Escalated by engineer",
              detail: payload.detail || "Escalated to a senior quality engineer for disposition.",
              evidence: payload.evidence || current.hypotheses[0]?.supporting || [],
              at: now,
              raisedBy: current.engineer,
            },
          },
          {
            action: "Case escalated",
            actor: current.engineer,
            actorType: "Human",
            description: payload.reason || "Escalated to senior quality engineer.",
            status: "Escalated",
          }
        );
        addTimeline(caseId, {
          title: "Case escalated",
          detail: payload.reason || "Escalated to senior quality engineer.",
          actor: current.engineer,
          kind: "human",
        });
      }
    },
    [addTimeline, patchCase]
  );

  const resolveEscalation = useCallback(
    (caseId, note) => {
      const current = stateRef.current.cases.find((c) => c.id === caseId);
      if (!current) return;
      const restoredStatus =
        current.status === "Closed"
          ? "Closed"
          : current.actionsApproved
            ? "Corrective Action In Progress"
            : current.diagnosisReview?.state === "approved"
              ? "Diagnosis Approved"
              : "Under Investigation";
      patchCase(
        caseId,
        { escalation: null, status: restoredStatus },
        {
          action: "Escalation resolved",
          actor: current.engineer,
          actorType: "Human",
          description: note || "Escalation resolved and investigation resumed.",
        }
      );
      addTimeline(caseId, {
        title: "Escalation resolved",
        detail: note || "Investigation resumed after escalation review.",
        actor: current.engineer,
        kind: "human",
      });
    },
    [addTimeline, patchCase]
  );

  const saveActions = useCallback(
    (caseId, actions) => {
      patchCase(caseId, { actions });
    },
    [patchCase]
  );

  const approveActions = useCallback(
    (caseId) => {
      const current = stateRef.current.cases.find((c) => c.id === caseId);
      if (!current) return;
      patchCase(
        caseId,
        { actionsApproved: true, status: "Corrective Action Approved", actionsRejectedReason: null },
        {
          action: "Corrective action approved",
          actor: current.engineer,
          actorType: "Human",
          description: `${current.actions.length}-action plan approved and released to owners.`,
        }
      );
      addTimeline(caseId, {
        title: "Corrective action approved",
        detail: `${current.actions.length}-action plan approved by ${current.engineer}.`,
        actor: current.engineer,
        kind: "human",
      });
    },
    [addTimeline, patchCase]
  );

  const rejectActions = useCallback(
    (caseId, reason) => {
      const current = stateRef.current.cases.find((c) => c.id === caseId);
      if (!current) return;
      patchCase(
        caseId,
        { actionsApproved: false, actionsRejectedReason: reason },
        {
          action: "Corrective action rejected",
          actor: current.engineer,
          actorType: "Human",
          description: `Action plan rejected: ${reason || "no reason recorded"}.`,
        }
      );
      addTimeline(caseId, {
        title: "Corrective action rejected",
        detail: reason || "No reason recorded.",
        actor: current.engineer,
        kind: "human",
      });
    },
    [addTimeline, patchCase]
  );

  const setActionStatus = useCallback(
    (caseId, actionId, status) => {
      const current = stateRef.current.cases.find((c) => c.id === caseId);
      if (!current) return;
      const actions = current.actions.map((a) => (a.id === actionId ? { ...a, status } : a));
      const allDone =
        actions.length > 0 &&
        actions.every((a) => a.status === "Completed" || a.status === "Verified");
      const released =
        current.status === "Corrective Action Approved" || current.status === "Verified";
      const nextStatus =
        current.status === "Closed"
          ? "Closed"
          : allDone
            ? "Verified"
            : released
              ? "Corrective Action In Progress"
              : current.status;
      patchCase(caseId, { actions, status: nextStatus });
      logAudit({
        caseId,
        action: "Corrective action updated",
        actor: current.engineer,
        actorType: "Human",
        description: `${actionId} status set to ${status}.`,
      });
    },
    [logAudit, patchCase]
  );

  const saveMonitoring = useCallback(
    (caseId, batchId, data, onDone) => {
      const current = stateRef.current.cases.find((c) => c.id === caseId);
      if (!current) return;
      const monitoring = current.monitoring.map((m) =>
        m.batchId === batchId
          ? {
              ...m,
              ...data,
              completed: Boolean(data.inspections && data.defects !== "" && data.defects !== undefined && data.result),
            }
          : m
      );
      const allComplete = monitoring.every((m) => m.completed);
      let effectiveness = current.effectiveness;
      if (allComplete) {
        const totalInspections = monitoring.reduce((sum, m) => sum + Number(m.inspections || 0), 0);
        const totalDefects = monitoring.reduce((sum, m) => sum + Number(m.defects || 0), 0);
        const rate = totalInspections ? (totalDefects / totalInspections) * 100 : 0;
        const anyFail = monitoring.some((m) => m.result === "Fail");
        const result = anyFail ? "Ineffective" : rate <= 4 ? "Effective" : rate <= 7 ? "Partially Effective" : "Ineffective";
        effectiveness = {
          result,
          rationale: `${totalDefects} defects across ${totalInspections} inspected units (${rate.toFixed(1)}%) after the corrective action. Baseline before the action was 8.4%.`,
          at: new Date().toISOString(),
        };
      }
      patchCase(caseId, { monitoring, effectiveness });
      addTimeline(
        caseId,
        {
          title: allComplete ? "Monitoring completed" : "Monitoring batch recorded",
          detail: `Batch ${batchId}: ${data.inspections || 0} inspected, ${data.defects || 0} defects, result ${data.result || "not set"}.`,
          actor: current.engineer,
          kind: "human",
        },
        {
          action: allComplete ? "Monitoring completed" : "Monitoring batch recorded",
          actor: current.engineer,
          actorType: "Human",
          description: `Batch ${batchId} inspection results recorded for ${caseId}.`,
        }
      );
      onDone?.(effectiveness);
    },
    [addTimeline, patchCase]
  );

  const closeCase = useCallback(
    (caseId) => {
      const current = stateRef.current.cases.find((c) => c.id === caseId);
      if (!current) return;
      if (!current.actionsApproved || !current.monitoring.every((row) => row.completed)) return;
      patchCase(
        caseId,
        { status: "Closed" },
        {
          action: "Investigation closed",
          actor: current.engineer,
          actorType: "Human",
          description: `${caseId} closed with effectiveness assessed as ${current.effectiveness?.result || "Not Assessed"}.`,
        }
      );
      addTimeline(caseId, {
        title: "Investigation closed",
        detail: `Closed with effectiveness assessed as ${current.effectiveness?.result || "Not Assessed"}.`,
        actor: current.engineer,
        kind: "human",
      });
    },
    [addTimeline, patchCase]
  );

  const markEvidence = useCallback(
    (caseId, evidenceId, status) => {
      const current = stateRef.current.cases.find((c) => c.id === caseId);
      if (!current) return;
      patchCase(caseId, {
        evidenceReviews: { ...current.evidenceReviews, [evidenceId]: status },
      });
      logAudit({
        caseId,
        action: "Evidence reviewed",
        actor: current.engineer,
        actorType: "Human",
        description: `${evidenceId} marked ${String(status).toLowerCase()} by the quality engineer.`,
      });
    },
    [logAudit, patchCase]
  );

  const resetDemo = useCallback(() => {
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [];
    activeRuns.current = {};
    setState({ cases: seedCases(), audit: AUDIT_SEED, notifications: [], agent: {} });
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const loadScenario = useCallback(
    (scenarioId) => {
      const scenario = SCENARIOS.find((s) => s.id === scenarioId);
      if (!scenario) return null;
      const scenarioCase = scenario.build();
      setState((s) => {
        const rest = s.cases.filter((c) => c.id !== scenarioCase.id);
        return { ...s, cases: [scenarioCase, ...rest] };
      });
      logAudit({
        caseId: scenarioCase.id,
        action: "Demo scenario loaded",
        actor: "Demo Mode",
        actorType: "Agent",
        description: `${scenario.code}: ${scenario.title}.`,
      });
      return scenarioCase;
    },
    [logAudit]
  );

  const updateCase = useCallback(
    (caseId, patch, audit) => patchCase(caseId, patch, audit),
    [patchCase]
  );

  const value = useMemo(
    () => ({
      cases: state.cases,
      audit: state.audit,
      agent: state.agent,
      getCase: (caseId) => state.cases.find((c) => c.id === caseId) || null,
      createCase,
      startInvestigation,
      updateCase,
      runVision,
      retrieveEvidence,
      generateHypotheses,
      recommendCheck,
      approveCheck,
      rejectCheck,
      submitCheckResult,
      reviewDiagnosis,
      resolveEscalation,
      saveActions,
      approveActions,
      rejectActions,
      setActionStatus,
      saveMonitoring,
      closeCase,
      markEvidence,
      resetDemo,
      loadScenario,
      runAgent,
    }),
    [
      state.cases,
      state.audit,
      state.agent,
      createCase,
      startInvestigation,
      updateCase,
      runVision,
      retrieveEvidence,
      generateHypotheses,
      recommendCheck,
      approveCheck,
      rejectCheck,
      submitCheckResult,
      reviewDiagnosis,
      resolveEscalation,
      saveActions,
      approveActions,
      rejectActions,
      setActionStatus,
      saveMonitoring,
      closeCase,
      markEvidence,
      resetDemo,
      loadScenario,
      runAgent,
    ]
  );

  return <InvestigationContext.Provider value={value}>{children}</InvestigationContext.Provider>;
}

export function useInvestigation() {
  const ctx = useContext(InvestigationContext);
  if (!ctx) throw new Error("useInvestigation must be used inside InvestigationProvider");
  return ctx;
}