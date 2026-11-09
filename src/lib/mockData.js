import { SAMPLE_IMAGES } from "@/lib/assets";

/* ------------------------------------------------------------------ */
/*  Reference data                                                     */
/* ------------------------------------------------------------------ */

export const FACILITY = "Pune Manufacturing Lab";
export const CURRENT_USER = { name: "R. Deshmukh", role: "Quality Engineer" };

export const NAV_ITEMS = [
  { label: "Overview", to: "/", icon: "LayoutDashboard" },
  { label: "Investigation Cases", to: "/cases", icon: "FolderSearch" },
  { label: "New Investigation", to: "/new", icon: "FilePlus2" },
  { label: "Evidence Repository", to: "/evidence", icon: "Database" },
  { label: "Corrective Actions", to: "/actions", icon: "ClipboardCheck" },
  { label: "Quality Monitoring", to: "/monitoring", icon: "Activity" },
  { label: "Knowledge Base", to: "/knowledge", icon: "BookOpen" },
  { label: "Audit Trail", to: "/audit", icon: "ScrollText" },
];

export const DEFECT_CATEGORIES = [
  "Surface Scratches",
  "Dimensional Deviation",
  "Burr Formation",
  "Surface Cracks",
];

export const SEVERITIES = ["Low", "Medium", "High", "Critical"];

export const CASE_STATUSES = [
  "Draft",
  "Under Investigation",
  "Diagnosis Approved",
  "Corrective Action Approved",
  "Corrective Action In Progress",
  "Verified",
  "Escalated",
  "Closed",
];

export const ENGINEERS = [
  "R. Deshmukh",
  "A. Kulkarni",
  "S. Iyer",
  "M. Fernandes",
  "P. Joshi",
];

export const LINES = ["Line 1 — CNC Cell 1", "Line 3 — CNC Cell 2", "Line 4 — CNC Cell 5"];
export const MACHINES = ["CNC-07", "CNC-11", "CNC-12", "CNC-14"];
export const MONITORING_BATCHES = ["B-205", "B-206", "B-207"];
export const SOURCE_TYPES = [
  "Production Records",
  "Machine Logs",
  "Material Reports",
  "Quality Procedures",
  "Historical Cases",
  "Maintenance Records",
];

export const KPIS = [
  { key: "inspections", label: "Total Inspections", value: "1,248", hint: "Last 30 days · all cells" },
  { key: "defects", label: "Defects Detected", value: "86", hint: "6.9% of inspected units" },
  { key: "active", label: "Active Investigations", value: "12", hint: "3 awaiting diagnostic result" },
  { key: "approvals", label: "Pending Approvals", value: "4", hint: "2 diagnoses · 2 action plans" },
  { key: "verified", label: "Verified Root Causes", value: "38", hint: "Quarter to date" },
  { key: "avg", label: "Average Investigation Time", value: "3.2 h", hint: "Target ≤ 4.0 h" },
];

/* ------------------------------------------------------------------ */
/*  Charts                                                             */
/* ------------------------------------------------------------------ */

export const defectTrend = [
  { label: "Sep 28", scratches: 9, dimensional: 6, burr: 4, cracks: 2 },
  { label: "Oct 01", scratches: 7, dimensional: 5, burr: 5, cracks: 1 },
  { label: "Oct 04", scratches: 11, dimensional: 7, burr: 3, cracks: 2 },
  { label: "Oct 07", scratches: 8, dimensional: 4, burr: 4, cracks: 1 },
  { label: "Oct 10", scratches: 12, dimensional: 8, burr: 5, cracks: 3 },
  { label: "Oct 13", scratches: 10, dimensional: 6, burr: 3, cracks: 2 },
  { label: "Oct 16", scratches: 14, dimensional: 9, burr: 6, cracks: 2 },
  { label: "Oct 19", scratches: 11, dimensional: 5, burr: 4, cracks: 3 },
  { label: "Oct 22", scratches: 13, dimensional: 7, burr: 5, cracks: 2 },
  { label: "Oct 25", scratches: 9, dimensional: 6, burr: 3, cracks: 1 },
  { label: "Oct 28", scratches: 8, dimensional: 5, burr: 2, cracks: 2 },
  { label: "Nov 04", scratches: 7, dimensional: 4, burr: 3, cracks: 1 },
];

export const defectByCategory = [
  { name: "Surface Scratches", value: 31, color: "#2563EB" },
  { name: "Dimensional Deviation", value: 24, color: "#0EA5E9" },
  { name: "Burr Formation", value: 19, color: "#F59E0B" },
  { name: "Surface Cracks", value: 12, color: "#DC2626" },
];

export const defectsByBatch = [
  { batch: "B-197", defects: 4, inspections: 96 },
  { batch: "B-198", defects: 7, inspections: 102 },
  { batch: "B-199", defects: 3, inspections: 88 },
  { batch: "B-200", defects: 9, inspections: 110 },
  { batch: "B-201", defects: 6, inspections: 94 },
  { batch: "B-202", defects: 11, inspections: 118 },
  { batch: "B-203", defects: 8, inspections: 104 },
  { batch: "B-204", defects: 14, inspections: 122 },
];

export const rootCauseDistribution = [
  { name: "Tool Wear", value: 12, color: "#2563EB" },
  { name: "Fixture Misalignment", value: 9, color: "#0EA5E9" },
  { name: "Incorrect Machining Parameters", value: 8, color: "#F59E0B" },
  { name: "Material Inconsistency", value: 5, color: "#8B5CF6" },
  { name: "Coolant-Related Issue", value: 4, color: "#DC2626" },
];

export const investigationStatusDistribution = [
  { name: "Under Investigation", value: 12, color: "#F59E0B" },
  { name: "Diagnosis Review", value: 4, color: "#2563EB" },
  { name: "Corrective Action", value: 7, color: "#6366F1" },
  { name: "Verified", value: 38, color: "#059669" },
  { name: "Escalated", value: 3, color: "#DC2626" },
];

export const monitoringTrend = [
  { label: "B-198", rate: 6.8, target: 4 },
  { label: "B-199", rate: 3.4, target: 4 },
  { label: "B-200", rate: 8.2, target: 4 },
  { label: "B-201", rate: 6.4, target: 4 },
  { label: "B-202", rate: 9.3, target: 4 },
  { label: "B-203", rate: 7.7, target: 4 },
  { label: "B-204", rate: 11.5, target: 4 },
  { label: "B-205", rate: 4.2, target: 4 },
  { label: "B-206", rate: 3.1, target: 4 },
];

export const repeatDefectData = [
  { label: "Surface Scratches", before: 8, after: 2 },
  { label: "Dimensional", before: 5, after: 2 },
  { label: "Burr Formation", before: 6, after: 3 },
  { label: "Surface Cracks", before: 3, after: 1 },
];

export const effectivenessData = [
  { name: "Effective", value: 21, color: "#059669" },
  { name: "Partially Effective", value: 9, color: "#F59E0B" },
  { name: "Ineffective", value: 4, color: "#DC2626" },
  { name: "Insufficient Data", value: 3, color: "#94A3B8" },
];

export const NOTIFICATIONS = [
  {
    id: "N-1",
    title: "Diagnosis awaiting your approval",
    detail: "MQI-2026-0041 · Dimensional deviation on batch B-203",
    at: "2026-11-07T14:20:00.000Z",
    tone: "blue",
  },
  {
    id: "N-2",
    title: "Diagnostic check approved",
    detail: "MQI-2026-0042 · Inspect fixture alignment",
    at: "2026-11-07T11:05:00.000Z",
    tone: "amber",
  },
  {
    id: "N-3",
    title: "Escalation raised",
    detail: "MQI-2026-0039 · Critical surface crack, low confidence",
    at: "2026-11-06T16:48:00.000Z",
    tone: "red",
  },
  {
    id: "N-4",
    title: "Monitoring batch completed",
    detail: "B-206 inspections recorded for MQI-2026-0040",
    at: "2026-11-06T09:12:00.000Z",
    tone: "green",
  },
];

export const ACTIVITY_FEED = [
  { id: "ACT-1", type: "defect", text: "New defect reported: Surface Scratches on PMH-88213", caseId: "MQI-2026-0042", at: "2026-11-07T16:10:00.000Z" },
  { id: "ACT-2", type: "records", text: "Production records retrieved for batch B-204", caseId: "MQI-2026-0042", at: "2026-11-07T16:04:00.000Z" },
  { id: "ACT-3", type: "check", text: "Diagnostic check requested: Inspect fixture alignment", caseId: "MQI-2026-0042", at: "2026-11-07T15:52:00.000Z" },
  { id: "ACT-4", type: "approval", text: "Engineer approval received for diagnostic check CHK-02", caseId: "MQI-2026-0042", at: "2026-11-07T15:40:00.000Z" },
  { id: "ACT-5", type: "verified", text: "Root cause verified: Tool wear on CNC-12", caseId: "MQI-2026-0041", at: "2026-11-07T13:22:00.000Z" },
  { id: "ACT-6", type: "action", text: "Corrective action completed: Replace insert grade", caseId: "MQI-2026-0040", at: "2026-11-07T10:35:00.000Z" },
  { id: "ACT-7", type: "escalation", text: "Case escalated to senior quality engineer", caseId: "MQI-2026-0039", at: "2026-11-06T16:48:00.000Z" },
  { id: "ACT-8", type: "monitoring", text: "Post-action inspection recorded for batch B-206", caseId: "MQI-2026-0040", at: "2026-11-06T09:12:00.000Z" },
];

/* ------------------------------------------------------------------ */
/*  Agent activity sequences                                           */
/* ------------------------------------------------------------------ */

export const AGENT_STEPS = {
  vision: [
    "Analyzing defect image…",
    "Locating defect region on the machined surface…",
    "Classifying defect pattern…",
    "Estimating severity classification…",
  ],
  evidence: [
    "Searching production records…",
    "Retrieving machining parameters…",
    "Checking material records…",
    "Searching historical cases…",
    "Reviewing quality procedures…",
    "Building investigation evidence…",
  ],
  hypotheses: [
    "Correlating evidence across sources…",
    "Identifying competing root cause hypotheses…",
    "Scoring hypotheses against evidence…",
    "Checking for contradictory evidence…",
  ],
  check: [
    "Evaluating diagnostic check options…",
    "Estimating diagnostic information gain…",
    "Selecting the most informative check…",
  ],
  revise: [
    "Ingesting diagnostic result…",
    "Updating hypothesis confidence…",
    "Determining root cause status…",
    "Checking remaining uncertainty…",
  ],
  actions: [
    "Drafting corrective action plan…",
    "Assigning owners and due dates…",
    "Linking verification methods…",
  ],
  monitoring: [
    "Retrieving post-action inspection results…",
    "Comparing against pre-action baseline…",
    "Assessing corrective action effectiveness…",
  ],
};

/* ------------------------------------------------------------------ */
/*  Evidence library                                                   */
/* ------------------------------------------------------------------ */

export const EVIDENCE_LIBRARY = [
  {
    id: "EVD-101",
    sourceType: "Machine Logs",
    recordName: "CNC-07 spindle telemetry",
    reference: "Batch B-204 · CNC-07",
    finding: "Spindle vibration exceeded the normal range during batch B-204 (peaks at 2.9 mm/s against a 2.0 mm/s limit).",
    timestamp: "2026-11-05T08:26:00.000Z",
    relevance: 92,
    status: "Relevant",
    batchId: "B-204",
    caseIds: ["MQI-2026-0042", "MQI-2026-0101"],
    detail:
      "Spindle vibration exceeded the normal range during batch B-204. The exceedance began at 08:26 and persisted across 41 of 122 machined units, concentrated on the top-face finishing pass. Vibration amplitude peaks at 2.9 mm/s against a validated limit of 2.0 mm/s. The log shows no alarm was raised because the threshold was configured as advisory rather than interlocked.",
  },
  {
    id: "EVD-102",
    sourceType: "Maintenance Records",
    recordName: "Tool change register · CNC-07",
    reference: "Tool T-14 · CNC-07",
    finding: "Tool replacement was overdue by 18 production cycles against the 240-cycle replacement interval.",
    timestamp: "2026-11-04T17:40:00.000Z",
    relevance: 88,
    status: "Relevant",
    batchId: "B-204",
    caseIds: ["MQI-2026-0042"],
    detail:
      "The T-14 finishing insert reached 258 production cycles before replacement, against a planned interval of 240 cycles. The replacement was recorded as overdue by 18 production cycles. No tool geometry measurement was taken at the time of replacement, so the actual wear state is unrecorded.",
  },
  {
    id: "EVD-103",
    sourceType: "Material Reports",
    recordName: "Incoming material inspection · lot HT-7712",
    reference: "Lot HT-7712 · B-204",
    finding: "Material hardness was within the specified range (91.2 HRB against a 88–95 HRB specification).",
    timestamp: "2026-11-02T10:15:00.000Z",
    relevance: 54,
    status: "Inconclusive",
    batchId: "B-204",
    caseIds: ["MQI-2026-0042"],
    detail:
      "Hardness was measured at 91.2 HRB on three coupons from lot HT-7712, inside the 88–95 HRB specification. Composition certificates are on file and within tolerance. Measurement uncertainty of the bench tester is ±0.8 HRB, which does not change the conclusion but does not exclude localised inconsistency within the lot.",
  },
  {
    id: "EVD-104",
    sourceType: "Historical Cases",
    recordName: "Case MQI-2025-0117 · scratch pattern after tool change omission",
    reference: "Historical · CNC-07",
    finding: "Similar scratches were previously associated with tool wear on the same workcell.",
    timestamp: "2025-09-18T13:05:00.000Z",
    relevance: 81,
    status: "Relevant",
    batchId: "B-188",
    caseIds: ["MQI-2026-0042", "MQI-2026-0101"],
    detail:
      "An identical parallel scratch cluster on the top face of the same part family was investigated in September 2025. The verified root cause was tool wear on the finishing insert, confirmed by optical measurement of 0.31 mm flank wear. The corrective action was a shortened replacement interval, later reverted during a schedule consolidation.",
  },
  {
    id: "EVD-105",
    sourceType: "Quality Procedures",
    recordName: "QP-114 · Surface defect inspection",
    reference: "Rev. 6 · Section 4.2",
    finding: "Surface scratch inspection must be conducted under 500–750 lux diffuse lighting at 45° viewing angle.",
    timestamp: "2026-08-30T00:00:00.000Z",
    relevance: 46,
    status: "Inconclusive",
    batchId: null,
    caseIds: ["MQI-2026-0042"],
    detail:
      "Procedure QP-114 Rev. 6 requires scratch inspection under 500–750 lux diffuse lighting at a 45° viewing angle, with a documented annual lux verification of the inspection station. It does not define an acceptance limit for cosmetic scratches on non-sealing surfaces, which is recorded as an open documentation gap.",
  },
  {
    id: "EVD-106",
    sourceType: "Machine Logs",
    recordName: "Fixture alignment measurement · CNC-07",
    reference: "Diagnostic CHK-02 · B-204",
    finding: "Fixture alignment deviation of 0.08 mm detected on the primary locating face (limit 0.02 mm).",
    timestamp: "2026-11-07T15:58:00.000Z",
    relevance: 96,
    status: "Relevant",
    batchId: "B-204",
    caseIds: ["MQI-2026-0042"],
    detail:
      "Dial indicator sweep of the primary locating face recorded a 0.08 mm deviation across the fixture span against an alignment limit of 0.02 mm. The deviation direction matches the observed scratch orientation. Mounting bolts on the rear clamp were found at reduced torque.",
  },
  {
    id: "EVD-107",
    sourceType: "Quality Procedures",
    recordName: "Repeat surface inspection · 30 units after realignment",
    reference: "Follow-up · B-205",
    finding: "Follow-up inspection confirmed the same scratch pattern before realignment, absent after.",
    timestamp: "2026-11-07T17:20:00.000Z",
    relevance: 74,
    status: "Relevant",
    batchId: "B-205",
    caseIds: ["MQI-2026-0042"],
    detail:
      "Thirty units machined before realignment reproduced the scratch cluster in 6 of 30 parts. Thirty units after realignment produced no recurrence. The inspection was performed at the same station with verified lighting to isolate the process variable.",
  },
  {
    id: "EVD-108",
    sourceType: "Production Records",
    recordName: "Process parameter trace · B-204",
    reference: "Batch B-204 · CNC-07",
    finding: "Feed rate varied ±6% across the batch but remained inside the validated process window.",
    timestamp: "2026-11-05T08:40:00.000Z",
    relevance: 68,
    status: "Relevant",
    batchId: "B-204",
    caseIds: ["MQI-2026-0042"],
    detail:
      "Feed rate ranged from 0.141 to 0.159 mm/rev against a validated window of 0.12–0.18 mm/rev. Spindle speed held at 4,800 rpm with a 1.4% deviation. No program edit was executed during the batch, and the variation is consistent with normal servo following error under increased cutting load.",
  },
  {
    id: "EVD-109",
    sourceType: "Machine Logs",
    recordName: "Coolant concentration log · CNC-07",
    reference: "Week 44 · CNC-07",
    finding: "Coolant concentration recorded at 6.8% against an 8–10% specification.",
    timestamp: "2026-11-03T06:30:00.000Z",
    relevance: 61,
    status: "Inconclusive",
    batchId: "B-204",
    caseIds: ["MQI-2026-0042"],
    detail:
      "Refractometer reading of 6.8% was recorded during the weekly check, below the 8–10% specification. Top-up was logged the following morning. Low concentration increases friction and can accelerate edge wear, but there is no direct measurement linking it to the scratch depth observed.",
  },
  {
    id: "EVD-110",
    sourceType: "Production Records",
    recordName: "Batch B-203 dimensional report",
    reference: "Batch B-203 · CNC-12",
    finding: "Bore diameter drifted 0.014 mm above nominal midway through the batch.",
    timestamp: "2026-10-29T11:05:00.000Z",
    relevance: 79,
    status: "Relevant",
    batchId: "B-203",
    caseIds: ["MQI-2026-0041"],
    detail:
      "Bore diameter moved from 24.988 mm to 25.014 mm against a nominal of 25.000 mm with a ±0.010 mm tolerance. The drift is progressive across the batch, which is characteristic of cutting edge wear rather than a fixture shift.",
  },
  {
    id: "EVD-111",
    sourceType: "Machine Logs",
    recordName: "Tool life trace · CNC-12",
    reference: "Batch B-203 · CNC-12",
    finding: "Insert flank wear measured at 0.29 mm after the batch against a 0.25 mm limit.",
    timestamp: "2026-10-29T15:10:00.000Z",
    relevance: 91,
    status: "Relevant",
    batchId: "B-203",
    caseIds: ["MQI-2026-0041"],
    detail:
      "Optical measurement of the boring insert after batch completion recorded 0.29 mm flank wear, above the 0.25 mm replacement limit. Surface finish deteriorated in step with the wear progression, and the measured diameter drift direction is consistent with edge recession.",
  },
  {
    id: "EVD-112",
    sourceType: "Quality Procedures",
    recordName: "QP-121 · Burr acceptance criteria",
    reference: "Rev. 3 · Section 6.1",
    finding: "Burr height above 0.05 mm on the sealing face is a reject condition.",
    timestamp: "2026-06-12T00:00:00.000Z",
    relevance: 57,
    status: "Relevant",
    batchId: null,
    caseIds: ["MQI-2026-0040"],
    detail:
      "The procedure defines 0.05 mm maximum burr height on sealing faces and permits 0.10 mm on non-functional edges. Deburring is a manual operation performed after machining, and the procedure requires a first-piece check at the start of each shift.",
  },
  {
    id: "EVD-113",
    sourceType: "Historical Cases",
    recordName: "Case MQI-2026-0009 · burr formation after insert chipping",
    reference: "Historical · CNC-11",
    finding: "Burst burrs at the exit edge were traced to a chipped insert corner.",
    timestamp: "2026-02-04T09:30:00.000Z",
    relevance: 72,
    status: "Relevant",
    batchId: "B-194",
    caseIds: ["MQI-2026-0040"],
    detail:
      "Insert corner chipping produced a concentrated burr at the exit edge in 14 of 90 parts. The verified corrective action was an insert grade change plus an added in-process edge check every 40 parts.",
  },
  {
    id: "EVD-114",
    sourceType: "Material Reports",
    recordName: "Heat treatment certificate · lot HT-7719",
    reference: "Lot HT-7719 · B-202",
    finding: "Lot hardness 84.6 HRB, below the 88–95 HRB specification.",
    timestamp: "2026-10-22T12:00:00.000Z",
    relevance: 84,
    status: "Relevant",
    batchId: "B-202",
    caseIds: [],
    detail:
      "Lot HT-7719 was accepted against a supplier certificate and re-tested on arrival at 84.6 HRB. Softer material can smear rather than cut, producing rolled burrs. The lot was consumed across batches B-202 and B-203 before the deviation was identified.",
  },
  {
    id: "EVD-115",
    sourceType: "Maintenance Records",
    recordName: "Fixture calibration record · CNC-12",
    reference: "Fixture FX-22",
    finding: "Last fixture calibration was 14 months ago against a 12-month interval.",
    timestamp: "2026-10-30T08:00:00.000Z",
    relevance: 63,
    status: "Relevant",
    batchId: "B-203",
    caseIds: ["MQI-2026-0041"],
    detail:
      "Calibration of fixture FX-22 is overdue by two months. Clamp force verification was last recorded at 4.1 kN against a specified 4.0 ± 0.2 kN, so no clamping deficiency is indicated, but the geometric verification is out of date.",
  },
  {
    id: "EVD-116",
    sourceType: "Historical Cases",
    recordName: "Case MQI-2025-0162 · hairline cracks from coolant starvation",
    reference: "Historical · CNC-14",
    finding: "Thermal cracking near the pocket corner followed a coolant nozzle blockage.",
    timestamp: "2025-12-11T10:20:00.000Z",
    relevance: 77,
    status: "Relevant",
    batchId: "B-186",
    caseIds: ["MQI-2026-0039"],
    detail:
      "A blocked coolant nozzle reduced flow to the pocket corner, producing localized thermal cracking in 3 of 60 parts. The cracks were only visible under dye penetrant inspection, not under unaided visual inspection.",
  },
  {
    id: "EVD-117",
    sourceType: "Production Records",
    recordName: "Batch B-202 process sheet",
    reference: "Batch B-202 · CNC-11",
    finding: "Process parameter entries for the second half of batch B-202 are missing from the record.",
    timestamp: "2026-10-24T00:00:00.000Z",
    relevance: 35,
    status: "Conflicting",
    batchId: "B-202",
    caseIds: ["MQI-2026-0040"],
    detail:
      "The paper process sheet for the second half of batch B-202 was not scanned into the system. Parameter verification for 46 of 118 units therefore cannot be evidenced. The gap prevents the agent from excluding parameter deviation for that portion of the batch.",
  },
  {
    id: "EVD-118",
    sourceType: "Quality Procedures",
    recordName: "QP-140 · Crack detection and disposition",
    reference: "Rev. 2 · Section 3.4",
    finding: "Any crack on a structural surface requires quarantine and senior disposition.",
    timestamp: "2026-05-08T00:00:00.000Z",
    relevance: 89,
    status: "Relevant",
    batchId: null,
    caseIds: ["MQI-2026-0039"],
    detail:
      "Cracks on structural surfaces are a safety-relevant condition. The procedure requires immediate quarantine of the affected batch, dye penetrant confirmation, and disposition by a senior quality engineer. The agent may not close or downgrade a crack case without human disposition.",
  },
  {
    id: "EVD-119",
    sourceType: "Maintenance Records",
    recordName: "Tool geometry measurement · T-14",
    reference: "Diagnostic CHK-01 · CNC-07",
    finding: "Flank wear measured at 0.11 mm, inside the 0.25 mm replacement limit.",
    timestamp: "2026-11-07T15:35:00.000Z",
    relevance: 93,
    status: "Relevant",
    batchId: "B-204",
    caseIds: ["MQI-2026-0042"],
    detail:
      "Optical comparator measurement recorded 0.11 mm flank wear on T-14 after removal, well inside the 0.25 mm limit. Edge chipping was not observed. The result weakens the tool wear hypothesis for the observed scratch pattern.",
  },
  {
    id: "EVD-120",
    sourceType: "Production Records",
    recordName: "First-piece inspection · B-201",
    reference: "Batch B-201 · CNC-14",
    finding: "First-piece inspection recorded a 0.02 mm surface step before the batch was released.",
    timestamp: "2026-10-18T07:55:00.000Z",
    relevance: 66,
    status: "Inconclusive",
    batchId: "B-201",
    caseIds: ["MQI-2026-0039"],
    detail:
      "The first-piece record shows a 0.02 mm surface step at the pocket corner, within print tolerance but at the upper end of the observed distribution. No follow-up measurement was recorded for the remainder of the batch.",
  },
];

export function getEvidenceItem(id) {
  return EVIDENCE_LIBRARY.find((item) => item.id === id) || null;
}

/* ------------------------------------------------------------------ */
/*  Knowledge base                                                     */
/* ------------------------------------------------------------------ */

export const KNOWLEDGE_ITEMS = [
  {
    id: "KB-01",
    name: "Defect taxonomy · Precision Metal Housing",
    category: "Defect Taxonomy",
    description: "Classification definitions for the four defect families recorded on the PMH part family, with visual references and rejection criteria.",
    lastReviewed: "2026-09-14T00:00:00.000Z",
    reviewedBy: "S. Iyer",
    status: "Expert-Reviewed",
    body: "Surface Scratches are linear material removal marks that do not change part geometry. Dimensional Deviation is any measured characteristic outside the drawing tolerance. Burr Formation is residual material at an edge exceeding 0.05 mm on a functional face. Surface Cracks are discontinuities that propagate into the material and are always safety-relevant. Each family carries a distinct investigation path: scratches and dimensional deviation usually resolve through process evidence, while cracks require quarantine and senior disposition.",
  },
  {
    id: "KB-02",
    name: "Diagnostic procedure · Fixture alignment verification",
    category: "Diagnostic Procedures",
    description: "Step-by-step dial indicator sweep for locating face alignment on CNC fixtures, including acceptance limits and documentation.",
    lastReviewed: "2026-10-02T00:00:00.000Z",
    reviewedBy: "M. Fernandes",
    status: "Expert-Reviewed",
    body: "Clean the locating face and mount a dial indicator on a rigid stand referenced to the machine table. Sweep the full span of the primary locating face in two orthogonal directions. Record the total indicator reading. Acceptance is 0.02 mm or less across the span. Torque-check the rear clamps after measurement; reduced torque is a common cause of progressive misalignment. Document the reading against the fixture ID, not the work order, so trends are visible across batches.",
  },
  {
    id: "KB-03",
    name: "Inspection standard · Surface finish under controlled lighting",
    category: "Inspection Standards",
    description: "Lighting, angle and viewing distance requirements for cosmetic surface inspection of machined faces.",
    lastReviewed: "2026-08-30T00:00:00.000Z",
    reviewedBy: "A. Kulkarni",
    status: "Expert-Reviewed",
    body: "Inspect under 500–750 lux diffuse lighting at a 45° viewing angle, with the part surface 300–400 mm from the inspector. Verify the inspection station lux level annually and after any lamp replacement. Scratch depth is not assessed visually; depth requires a profilometer or a comparator with a known reference. Photograph any defect with a scale reference so that later review does not depend on the original inspector's judgement.",
  },
  {
    id: "KB-04",
    name: "Case library · Scratch patterns traced to tool wear",
    category: "Historical Cases",
    description: "Six expert-reviewed cases where parallel scratch clusters were traced to cutting edge degradation rather than handling damage.",
    lastReviewed: "2026-07-21T00:00:00.000Z",
    reviewedBy: "P. Joshi",
    status: "Expert-Reviewed",
    body: "In five of six reviewed cases, parallel scratch clusters with uniform spacing were traced to flank wear above 0.25 mm. In the sixth, the pattern was caused by a chip trapped between the insert and the holder. A distinguishing signal is orientation: wear-induced scratches follow the feed direction, while trapped chips produce short random gouges. Tool geometry measurement was decisive in every case and should be treated as the first diagnostic step.",
  },
  {
    id: "KB-05",
    name: "Process knowledge · Coolant concentration and edge life",
    category: "Process Knowledge",
    description: "Relationship between coolant concentration, friction, and cutting edge degradation on aluminium housings.",
    lastReviewed: "2026-06-18T00:00:00.000Z",
    reviewedBy: "S. Iyer",
    status: "Expert-Reviewed",
    body: "Concentration below 8% increases friction and accelerates edge wear on aluminium alloys, while concentration above 10% can cause foaming and reduced cooling at the cutting zone. Concentration should be verified with a refractometer at the same time each week, using the same sample point. A single low reading is weak evidence on its own; a sustained trend across two or more weeks is meaningful.",
  },
  {
    id: "KB-06",
    name: "Corrective action guide · Fixture realignment",
    category: "Corrective Action Guidelines",
    description: "Standard corrective action set for confirmed fixture misalignment, with verification and monitoring requirements.",
    lastReviewed: "2026-10-11T00:00:00.000Z",
    reviewedBy: "M. Fernandes",
    status: "Expert-Reviewed",
    body: "A confirmed misalignment requires five actions: realign the fixture to the 0.02 mm limit, verify clamping pressure against the specification, inspect the mounting surface for fretting or debris, run a first-piece inspection before releasing the batch, and monitor the next three production batches for recurrence. The action plan is not complete until the monitoring evidence is recorded and assessed.",
  },
  {
    id: "KB-07",
    name: "Escalation criteria · Safety-relevant and low-confidence cases",
    category: "Inspection Standards",
    description: "When an investigation must be escalated to a senior quality engineer rather than resolved by the agent.",
    lastReviewed: "2026-10-27T00:00:00.000Z",
    reviewedBy: "A. Kulkarni",
    status: "Expert-Reviewed",
    body: "Escalate when the defect family is safety-relevant (cracks, structural discontinuities), when the leading hypothesis confidence is below 55%, when two hypotheses remain within 10 points of each other after a diagnostic check, or when required production records are missing. The agent may recommend escalation but may never approve a corrective action or authorise a physical process change.",
  },
  {
    id: "KB-08",
    name: "Gauge and measurement variation study",
    category: "Process Knowledge",
    description: "Repeatability and reproducibility requirements before dimensional data can be used as investigation evidence.",
    lastReviewed: "2026-09-05T00:00:00.000Z",
    reviewedBy: "P. Joshi",
    status: "Under Review",
    body: "Dimensional evidence should not be treated as conclusive until a gauge R&R study shows repeatability and reproducibility below 30% of tolerance. For the bore diameter characteristic this study is outstanding, which limits how strongly measurement variation can be excluded as a root cause.",
  },
];

/* ------------------------------------------------------------------ */
/*  Hypotheses, checks, actions                                        */
/* ------------------------------------------------------------------ */

export const HYPOTHESIS_LIBRARY = [
  {
    name: "Tool Wear",
    summary: "Cutting edge degradation changes the contact geometry and leaves parallel marks in the feed direction.",
    rationale:
      "Tool replacement was recorded as overdue by 18 production cycles (EVD-102), and historical case EVD-104 associates an identical scratch pattern on the same workcell with worn tooling.",
  },
  {
    name: "Fixture Misalignment",
    summary: "A workholding offset changes contact geometry, producing vibration and localized surface damage.",
    rationale:
      "Spindle vibration exceeded the normal range during batch B-204 (EVD-101), which is consistent with a fixture that is not fully seated or has lost clamp torque.",
  },
  {
    name: "Incorrect Machining Parameters",
    summary: "Feed or speed outside the validated window increases cutting load and surface damage.",
    rationale:
      "Feed rate varied ±6% across the batch (EVD-108). The variation remains inside the validated window, so the evidence is suggestive rather than decisive.",
  },
  {
    name: "Material Inconsistency",
    summary: "Hardness or heat-treatment lot variance changes chip formation and surface response.",
    rationale:
      "Material hardness for lot HT-7712 was inside the specified range (EVD-103). No strong supporting evidence is currently available for this batch.",
  },
  {
    name: "Coolant-Related Issue",
    summary: "Reduced coolant concentration or flow raises friction and accelerates edge degradation.",
    rationale:
      "Coolant concentration was recorded at 6.8% against an 8–10% specification (EVD-109), which is a weak but relevant indicator.",
  },
  {
    name: "Measurement Variation",
    summary: "Gauge or inspection setup error inflates the recorded defect, without a real process change.",
    rationale:
      "No repeat gauge study is on file for this workcell, so measurement variation cannot be formally excluded from the evidence set.",
  },
];

export const DIAGNOSTIC_CHECKS = [
  {
    id: "CHK-01",
    name: "Inspect Tool Geometry",
    purpose: "Measure flank wear and edge condition to confirm or exclude tool wear as the source of the scratch pattern.",
    hypotheses: ["Tool Wear"],
    expected: "Flank wear measurement against the 0.25 mm replacement limit, plus a visual check for edge chipping.",
    equipment: "Tool room optical comparator",
    engineer: "M. Fernandes",
    duration: "45 min",
    risk: "Low",
    priority: "High",
    recommended: true,
    resultEvidenceId: "EVD-119",
  },
  {
    id: "CHK-02",
    name: "Inspect Fixture Alignment",
    purpose: "Sweep the locating face to detect geometric offset that would explain vibration and scratch orientation.",
    hypotheses: ["Fixture Misalignment"],
    expected: "Total indicator reading across the fixture span against the 0.02 mm alignment limit.",
    equipment: "Dial indicator with magnetic base",
    engineer: "R. Deshmukh",
    duration: "30 min",
    risk: "Low",
    priority: "High",
    recommended: false,
    resultEvidenceId: "EVD-106",
  },
  {
    id: "CHK-03",
    name: "Verify Feed Rate",
    purpose: "Confirm the executed feed rate against the validated process window for the batch.",
    hypotheses: ["Incorrect Machining Parameters"],
    expected: "Per-unit feed rate trace compared with the 0.12–0.18 mm/rev window.",
    equipment: "Machine data historian export",
    engineer: "P. Joshi",
    duration: "20 min",
    risk: "Low",
    priority: "Medium",
    recommended: false,
    resultEvidenceId: "EVD-108",
  },
  {
    id: "CHK-04",
    name: "Review Coolant Concentration",
    purpose: "Establish whether low concentration contributed to friction and edge degradation.",
    hypotheses: ["Coolant-Related Issue"],
    expected: "Refractometer readings for the batch window against the 8–10% specification.",
    equipment: "Refractometer",
    engineer: "S. Iyer",
    duration: "15 min",
    risk: "Low",
    priority: "Medium",
    recommended: false,
    resultEvidenceId: "EVD-109",
  },
  {
    id: "CHK-05",
    name: "Perform Material Hardness Test",
    purpose: "Exclude lot-level material inconsistency as a contributing cause.",
    hypotheses: ["Material Inconsistency"],
    expected: "Hardness readings on retained coupons against the 88–95 HRB specification.",
    equipment: "Rockwell hardness tester",
    engineer: "A. Kulkarni",
    duration: "1 h",
    risk: "Low",
    priority: "Medium",
    recommended: false,
    resultEvidenceId: "EVD-103",
  },
  {
    id: "CHK-06",
    name: "Repeat Surface Inspection",
    purpose: "Re-inspect a controlled sample to confirm the defect recurs and is not a one-off inspection artefact.",
    hypotheses: ["Measurement Variation"],
    expected: "Defect count across 30 units under verified lighting conditions.",
    equipment: "Inspection station with lux meter",
    engineer: "A. Kulkarni",
    duration: "40 min",
    risk: "Low",
    priority: "Medium",
    recommended: false,
    resultEvidenceId: "EVD-107",
  },
];

export const ACTION_OWNERS = ["R. Deshmukh", "M. Fernandes", "S. Iyer", "P. Joshi", "A. Kulkarni"];
export const ACTION_PRIORITIES = ["Low", "Medium", "High", "Critical"];
export const ACTION_STATUSES = ["Not Started", "In Progress", "Completed", "Verified"];

export const CORRECTIVE_ACTION_TEMPLATES = {
  "Fixture Misalignment": [
    { description: "Realign the machining fixture to the 0.02 mm alignment limit and document the indicator reading.", owner: "M. Fernandes", priority: "High", dueDays: 2, verification: "Dial indicator sweep record attached to FX-22" },
    { description: "Verify fixture clamping pressure against the 4.0 ± 0.2 kN specification.", owner: "M. Fernandes", priority: "High", dueDays: 2, verification: "Clamp force verification sheet" },
    { description: "Inspect the fixture mounting surface for fretting, debris and bolt torque loss.", owner: "P. Joshi", priority: "Medium", dueDays: 4, verification: "Mounting surface inspection checklist" },
    { description: "Perform a first-piece inspection before releasing the next batch.", owner: "A. Kulkarni", priority: "High", dueDays: 3, verification: "Signed first-piece inspection record" },
    { description: "Monitor the next three production batches for recurrence of surface scratches.", owner: "R. Deshmukh", priority: "Medium", dueDays: 10, verification: "Monitoring batches B-205 to B-207 with defect counts" },
  ],
  "Tool Wear": [
    { description: "Replace the finishing insert and reduce the replacement interval to 200 production cycles.", owner: "M. Fernandes", priority: "High", dueDays: 3, verification: "Tool change register with revised interval" },
    { description: "Add an in-process tool geometry check every 40 parts on CNC-12.", owner: "P. Joshi", priority: "Medium", dueDays: 5, verification: "In-process check sheet, first week of records" },
    { description: "Run a first-piece dimensional inspection after the tool change.", owner: "A. Kulkarni", priority: "High", dueDays: 2, verification: "Dimensional report within ±0.010 mm" },
    { description: "Monitor the next three production batches for dimensional drift.", owner: "R. Deshmukh", priority: "Medium", dueDays: 12, verification: "Monitoring batches with bore diameter trend" },
  ],
  "Incorrect Machining Parameters": [
    { description: "Lock the feed rate to the validated 0.15 mm/rev setpoint and remove local operator override.", owner: "S. Iyer", priority: "High", dueDays: 3, verification: "Program parameter export showing locked setpoint" },
    { description: "Re-qualify the machining program against the process window.", owner: "M. Fernandes", priority: "High", dueDays: 6, verification: "Qualification run report" },
    { description: "Monitor the next three production batches for burr height.", owner: "R. Deshmukh", priority: "Medium", dueDays: 10, verification: "Burr height measurements on 30 units per batch" },
  ],
  "Surface Cracks": [
    { description: "Quarantine all parts from the affected batch and perform dye penetrant inspection.", owner: "A. Kulkarni", priority: "Critical", dueDays: 1, verification: "Penetrant inspection report and quarantine log" },
    { description: "Verify coolant flow and nozzle condition at the pocket corner.", owner: "P. Joshi", priority: "High", dueDays: 2, verification: "Flow measurement record" },
    { description: "Escalate disposition to the senior quality engineer before any batch release.", owner: "R. Deshmukh", priority: "Critical", dueDays: 1, verification: "Signed disposition record" },
  ],
  "Coolant-Related Issue": [
    { description: "Restore coolant concentration to the 8–10% specification and log the refractometer reading.", owner: "S. Iyer", priority: "High", dueDays: 2, verification: "Refractometer log for the coolant sump" },
    { description: "Verify coolant flow and nozzle condition at the pocket corner.", owner: "P. Joshi", priority: "High", dueDays: 2, verification: "Flow measurement record" },
    { description: "Monitor the next three production batches for recurrence of the defect.", owner: "R. Deshmukh", priority: "Medium", dueDays: 10, verification: "Monitoring batches with defect counts" },
  ],
  "Measurement Variation": [
    { description: "Complete a gauge R&R study for the inspection workcell before further disposition.", owner: "A. Kulkarni", priority: "High", dueDays: 4, verification: "Signed gauge R&R report" },
    { description: "Re-verify inspection lighting and magnification against the inspection standard.", owner: "P. Joshi", priority: "Medium", dueDays: 3, verification: "Lux measurement and station checklist" },
    { description: "Re-inspect retained units from the affected batch under verified conditions.", owner: "A. Kulkarni", priority: "Medium", dueDays: 5, verification: "Repeat inspection record" },
  ],
  "Material Inconsistency": [
    { description: "Quarantine remaining stock from the affected heat treatment lot.", owner: "S. Iyer", priority: "High", dueDays: 1, verification: "Quarantine tag and stock record" },
    { description: "Re-test hardness on coupons from the retained lot.", owner: "A. Kulkarni", priority: "Medium", dueDays: 3, verification: "Hardness test report" },
    { description: "Add incoming hardness verification for the supplier.", owner: "P. Joshi", priority: "Medium", dueDays: 8, verification: "Updated incoming inspection plan" },
  ],
};

export const HYPOTHESES_BY_DEFECT = {
  "Surface Scratches": [
    ["Tool Wear", 78],
    ["Fixture Misalignment", 51],
    ["Incorrect Machining Parameters", 36],
    ["Material Inconsistency", 18],
  ],
  "Dimensional Deviation": [
    ["Tool Wear", 74],
    ["Incorrect Machining Parameters", 47],
    ["Fixture Misalignment", 33],
    ["Measurement Variation", 29],
  ],
  "Burr Formation": [
    ["Incorrect Machining Parameters", 69],
    ["Tool Wear", 58],
    ["Material Inconsistency", 41],
    ["Fixture Misalignment", 22],
  ],
  "Surface Cracks": [
    ["Coolant-Related Issue", 47],
    ["Material Inconsistency", 44],
    ["Incorrect Machining Parameters", 31],
    ["Tool Wear", 24],
  ],
};

/* ------------------------------------------------------------------ */
/*  Cases                                                              */
/* ------------------------------------------------------------------ */

const iso = (day, hour = 9, minute = 0) =>
  new Date(Date.UTC(2026, 10, day, hour, minute)).toISOString();

export const buildHypothesis = (name, confidence, supporting = [], contradicting = [], missing = []) => {
  const lib = HYPOTHESIS_LIBRARY.find((h) => h.name === name) || {
    summary: "",
    rationale: "",
  };
  return {
    id: `H-${name.replace(/[^a-zA-Z]+/g, "-").toLowerCase()}`,
    name,
    confidence,
    supporting,
    contradicting,
    missing,
    summary: lib.summary,
    rationale: lib.rationale,
  };
};

const tl = (at, title, detail, actor = "AI Investigation Agent", kind = "agent") => ({
  at,
  title,
  detail,
  actor,
  kind,
});

function makeCase(overrides) {
  const base = {
    component: "Precision Metal Housing",
    componentId: "PMH-88213",
    batchId: "B-204",
    line: "Line 3 — CNC Cell 2",
    machineId: "CNC-07",
    inspectedAt: iso(6, 9, 42),
    defectCategory: "Surface Scratches",
    severity: "Medium",
    description: "",
    inspector: "A. Kulkarni",
    engineer: "R. Deshmukh",
    status: "Under Investigation",
    stage: 1,
    imageUrl: null,
    imageName: "sample-inspection.png",
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
    timeline: [],
    escalation: null,
    createdAt: iso(6, 9, 42),
    updatedAt: iso(6, 9, 42),
  };
  const merged = { ...base, ...overrides };
  merged.imageUrl = merged.imageUrl || SAMPLE_IMAGES[merged.defectCategory] || SAMPLE_IMAGES["Surface Scratches"];
  return merged;
}

const visionScratches = {
  category: "Surface Scratches",
  confidence: 94.2,
  severity: "Medium",
  bbox: { x: 0.3, y: 0.34, w: 0.34, h: 0.22 },
  findings: [
    "Linear scratch cluster on the machined top face, approximately 22 mm end to end.",
    "Four parallel marks with uniform spacing, oriented along the feed direction.",
    "No material discolouration or thermal signature around the marks.",
    "Estimated depth is shallow; depth cannot be measured from the image alone.",
  ],
};

export function seedCases() {
  return [
    makeCase({
      id: "MQI-2026-0042",
      status: "Under Investigation",
      stage: 4,
      severity: "Medium",
      batchId: "B-204",
      inspectedAt: iso(5, 8, 42),
      createdAt: iso(5, 9, 10),
      updatedAt: iso(7, 16, 10),
      description:
        "Linear scratch cluster on the machined top face, approximately 22 mm long, visible under 500 lux inspection lighting. Scratch depth appears shallow; no material discolouration around the marks.",
      vision: visionScratches,
      evidenceIds: ["EVD-101", "EVD-102", "EVD-103", "EVD-104", "EVD-105", "EVD-108", "EVD-109"],
      evidenceRetrieved: true,
      evidenceReviews: { "EVD-101": "Relevant", "EVD-102": "Relevant", "EVD-104": "Relevant", "EVD-105": "Inconclusive" },
      hypotheses: [
        buildHypothesis("Tool Wear", 78, ["EVD-102", "EVD-104"], [], ["Tool geometry measurement (CHK-01)"]),
        buildHypothesis("Fixture Misalignment", 51, ["EVD-101"], [], ["Fixture alignment measurement (CHK-02)"]),
        buildHypothesis("Incorrect Machining Parameters", 36, ["EVD-108"], [], ["Per-unit feed rate confirmation"]),
        buildHypothesis("Material Inconsistency", 18, [], ["EVD-103"], ["Hardness re-test on retained coupons"]),
      ],
      timeline: [
        tl(iso(5, 9, 10), "Case created", "MQI-2026-0042 opened for Surface Scratches on batch B-204.", "A. Kulkarni", "human"),
        tl(iso(5, 9, 14), "Image analysis completed", "Defect classified as Surface Scratches at 94.2% illustrative confidence.", "AI Investigation Agent", "agent"),
        tl(iso(5, 9, 31), "Evidence retrieved", "7 records retrieved across 5 source types.", "AI Investigation Agent", "agent"),
        tl(iso(5, 9, 44), "Hypotheses generated", "4 competing root cause hypotheses scored against retrieved evidence.", "AI Investigation Agent", "agent"),
        tl(iso(7, 15, 40), "Diagnostic check approved", "CHK-01 Inspect Tool Geometry approved by the quality engineer.", "R. Deshmukh", "human"),
      ],
    }),
    makeCase({
      id: "MQI-2026-0041",
      status: "Diagnosis Approved",
      stage: 7,
      defectCategory: "Dimensional Deviation",
      severity: "High",
      batchId: "B-203",
      machineId: "CNC-12",
      line: "Line 1 — CNC Cell 1",
      componentId: "PMH-88207",
      engineer: "S. Iyer",
      inspectedAt: iso(3, 10, 15),
      createdAt: iso(3, 10, 40),
      updatedAt: iso(7, 13, 25),
      description:
        "Bore diameter measured 25.014 mm against a nominal 25.000 mm with a ±0.010 mm tolerance. Drift is progressive across the batch.",
      vision: {
        category: "Dimensional Deviation",
        confidence: 89.6,
        severity: "High",
        bbox: { x: 0.42, y: 0.4, w: 0.2, h: 0.2 },
        findings: [
          "Visual inspection shows a witness mark on the bore entry chamfer.",
          "Dimensional drift is progressive, not stepwise.",
          "CMM record confirms 0.014 mm deviation on 22 of 104 parts.",
        ],
      },
      evidenceIds: ["EVD-110", "EVD-111", "EVD-115", "EVD-108"],
      evidenceRetrieved: true,
      evidenceReviews: { "EVD-110": "Relevant", "EVD-111": "Relevant", "EVD-115": "Inconclusive" },
      hypotheses: [
        buildHypothesis("Tool Wear", 88, ["EVD-110", "EVD-111"], ["EVD-115"], []),
        buildHypothesis("Incorrect Machining Parameters", 31, ["EVD-108"], ["EVD-111"], []),
        buildHypothesis("Fixture Misalignment", 24, ["EVD-115"], ["EVD-111"], []),
      ],
      previousHypotheses: null,
      diagnosis: {
        primary: "Tool Wear",
        confidence: 88,
        status: "Approved — Verified by Engineer",
        supporting: ["EVD-111", "EVD-110"],
        contradicting: ["EVD-115"],
        summary:
          "Progressive diameter drift across batch B-203 tracks a measured flank wear of 0.29 mm on the boring insert (EVD-111), above the 0.25 mm limit. Fixture calibration is overdue (EVD-115) but clamp force was verified, and parameter records show no out-of-window values.",
      },
      diagnosisReview: { state: "approved", at: iso(7, 13, 25), by: "S. Iyer" },
      checks: DIAGNOSTIC_CHECKS.map((check) => ({ ...check, status: "available", result: null })),
      timeline: [
        tl(iso(3, 10, 40), "Case created", "MQI-2026-0041 opened for Dimensional Deviation on batch B-203.", "A. Kulkarni", "human"),
        tl(iso(3, 11, 2), "Hypotheses generated", "3 hypotheses scored; tool wear leading at 88%.", "AI Investigation Agent", "agent"),
        tl(iso(4, 9, 20), "Diagnostic result entered", "Tool geometry measurement recorded at 0.29 mm flank wear.", "S. Iyer", "human"),
        tl(iso(7, 13, 25), "Diagnosis approved", "Tool Wear confirmed as root cause by the quality engineer.", "S. Iyer", "human"),
      ],
    }),
    makeCase({
      id: "MQI-2026-0040",
      status: "Corrective Action In Progress",
      stage: 7,
      defectCategory: "Burr Formation",
      severity: "Medium",
      batchId: "B-202",
      machineId: "CNC-11",
      line: "Line 1 — CNC Cell 1",
      componentId: "PMH-88201",
      engineer: "P. Joshi",
      inspectedAt: iso(1, 13, 5),
      createdAt: iso(1, 13, 30),
      updatedAt: iso(7, 10, 35),
      description:
        "Burr formation at the exit edge of the pocket, measured 0.09 mm against a 0.05 mm acceptance limit on the sealing face.",
      vision: {
        category: "Burr Formation",
        confidence: 91.4,
        severity: "Medium",
        bbox: { x: 0.2, y: 0.52, w: 0.3, h: 0.16 },
        findings: [
          "Rolled burr at the pocket exit edge, continuous over 14 mm.",
          "No burr observed on the opposite edge.",
          "Sealing face affected, so the acceptance limit is 0.05 mm.",
        ],
      },
      evidenceIds: ["EVD-112", "EVD-113", "EVD-114", "EVD-117"],
      evidenceRetrieved: true,
      evidenceReviews: { "EVD-114": "Relevant", "EVD-117": "Inconclusive" },
      hypotheses: [
        buildHypothesis("Material Inconsistency", 81, ["EVD-114"], [], []),
        buildHypothesis("Incorrect Machining Parameters", 44, ["EVD-113"], ["EVD-117"], ["Parameter record for second half of batch"]),
        buildHypothesis("Tool Wear", 28, ["EVD-113"], ["EVD-114"], []),
      ],
      diagnosis: {
        primary: "Material Inconsistency",
        confidence: 81,
        status: "Approved — Verified by Engineer",
        supporting: ["EVD-114", "EVD-113"],
        contradicting: ["EVD-117"],
        summary:
          "Lot HT-7719 was accepted at 84.6 HRB against an 88–95 HRB specification (EVD-114). Softer material rolls rather than shears at the exit edge, matching the observed burr geometry and the earlier chipped-insert case (EVD-113). Production records for the second half of B-202 are missing (EVD-117), so parameter deviation cannot be fully excluded.",
      },
      diagnosisReview: { state: "approved", at: iso(3, 9, 15), by: "P. Joshi" },
      actions: [
        { id: "CA-1", description: "Quarantine remaining stock from heat treatment lot HT-7719.", owner: "S. Iyer", priority: "High", dueDate: iso(4), status: "Verified", verification: "Quarantine tag and stock record" },
        { id: "CA-2", description: "Re-test hardness on retained coupons from the affected lot.", owner: "A. Kulkarni", priority: "Medium", dueDate: iso(5), status: "Completed", verification: "Hardness test report" },
        { id: "CA-3", description: "Add incoming hardness verification for the supplier certificate.", owner: "P. Joshi", priority: "Medium", dueDate: iso(12), status: "In Progress", verification: "Updated incoming inspection plan" },
        { id: "CA-4", description: "Monitor the next three production batches for burr recurrence.", owner: "R. Deshmukh", priority: "Medium", dueDate: iso(18), status: "In Progress", verification: "Monitoring batches B-205 to B-207" },
      ],
      actionsApproved: true,
      monitoring: [
        { batchId: "B-205", inspections: "118", defects: "3", result: "Pass", notes: "Burr height 0.03 mm max on 30 sampled units.", completed: true },
        { batchId: "B-206", inspections: "104", defects: "1", result: "Pass", notes: "One isolated burr at 0.05 mm, reworked.", completed: true },
        { batchId: "B-207", inspections: "", defects: "", result: "", notes: "", completed: false },
      ],
      timeline: [
        tl(iso(1, 13, 30), "Case created", "MQI-2026-0040 opened for Burr Formation on batch B-202.", "A. Kulkarni", "human"),
        tl(iso(1, 14, 5), "Hypotheses generated", "Material inconsistency leading at 81%.", "AI Investigation Agent", "agent"),
        tl(iso(3, 9, 15), "Diagnosis approved", "Material inconsistency confirmed by the quality engineer.", "P. Joshi", "human"),
        tl(iso(3, 9, 40), "Corrective action approved", "4-action plan approved and released to owners.", "P. Joshi", "human"),
        tl(iso(7, 10, 35), "Corrective action completed", "Lot quarantine and coupon re-test verified as effective.", "S. Iyer", "human"),
      ],
    }),
    makeCase({
      id: "MQI-2026-0039",
      status: "Escalated",
      stage: 4,
      defectCategory: "Surface Cracks",
      severity: "Critical",
      batchId: "B-201",
      machineId: "CNC-14",
      line: "Line 4 — CNC Cell 5",
      componentId: "PMH-88196",
      engineer: "A. Kulkarni",
      inspector: "P. Joshi",
      inspectedAt: iso(30, 15, 20),
      createdAt: iso(30, 15, 50),
      updatedAt: iso(6, 16, 48),
      description:
        "Fine branching crack at the pocket corner, approximately 8 mm long. Visible without magnification; batch quarantined pending disposition.",
      vision: {
        category: "Surface Cracks",
        confidence: 71.8,
        severity: "Critical",
        bbox: { x: 0.46, y: 0.46, w: 0.22, h: 0.18 },
        findings: [
          "Branching discontinuity at the pocket corner, propagating into the wall.",
          "Coolant staining around the crack suggests a thermal contribution.",
          "Crack depth unknown; penetrant confirmation required.",
        ],
      },
      evidenceIds: ["EVD-116", "EVD-118", "EVD-120"],
      evidenceRetrieved: true,
      evidenceReviews: { "EVD-118": "Relevant", "EVD-116": "Relevant", "EVD-120": "Inconclusive" },
      hypotheses: [
        buildHypothesis("Coolant-Related Issue", 47, ["EVD-116"], [], ["Coolant flow measurement at the pocket corner"]),
        buildHypothesis("Material Inconsistency", 44, [], [], ["Hardness and microstructure report for lot HT-7705"]),
        buildHypothesis("Incorrect Machining Parameters", 31, ["EVD-120"], [], ["Full batch parameter trace"]),
      ],
      escalation: {
        reason: "Safety-relevant defect with unresolved evidence conflict",
        detail:
          "Two hypotheses remain within 3 points of each other (coolant-related 47%, material inconsistency 44%) and the defect family is safety-relevant under QP-140. The agent is not permitted to dispose of a crack case.",
        evidence: ["EVD-118", "EVD-116"],
        at: iso(6, 16, 48),
        raisedBy: "AI Investigation Agent",
      },
      timeline: [
        tl(iso(30, 15, 50), "Case created", "MQI-2026-0039 opened for Surface Cracks on batch B-201.", "P. Joshi", "human"),
        tl(iso(30, 16, 20), "Evidence retrieved", "3 records retrieved; production parameter trace incomplete.", "AI Investigation Agent", "agent"),
        tl(iso(31, 9, 10), "Hypotheses generated", "3 hypotheses scored; leading confidence 47%, below the escalation threshold.", "AI Investigation Agent", "agent"),
        tl(iso(6, 16, 48), "Case escalated", "Escalated to senior quality engineer: safety-relevant defect with conflicting evidence.", "AI Investigation Agent", "agent"),
      ],
    }),
    makeCase({
      id: "MQI-2026-0038",
      status: "Verified",
      stage: 7,
      defectCategory: "Surface Scratches",
      severity: "Low",
      batchId: "B-199",
      machineId: "CNC-07",
      line: "Line 3 — CNC Cell 2",
      componentId: "PMH-88180",
      engineer: "R. Deshmukh",
      inspectedAt: iso(20, 8, 30),
      createdAt: iso(20, 9, 0),
      updatedAt: iso(4, 11, 20),
      description:
        "Scattered shallow scratches across the top face on 4 of 88 inspected parts. Cosmetic only; no functional surface affected.",
      vision: {
        category: "Surface Scratches",
        confidence: 92.8,
        severity: "Low",
        bbox: { x: 0.34, y: 0.38, w: 0.28, h: 0.2 },
        findings: [
          "Shallow scattered scratches, non-directional.",
          "No effect on sealing or mating surfaces.",
          "Pattern consistent with handling damage rather than cutting.",
        ],
      },
      evidenceIds: ["EVD-101", "EVD-104", "EVD-105"],
      evidenceRetrieved: true,
      hypotheses: [buildHypothesis("Fixture Misalignment", 91, ["EVD-101"], [], [])],
      diagnosis: {
        primary: "Fixture Misalignment",
        confidence: 91,
        status: "Verified — Monitoring Complete",
        supporting: ["EVD-101", "EVD-107"],
        contradicting: [],
        summary:
          "Fixture alignment deviation of 0.08 mm matched the scratch orientation, and follow-up inspection after realignment showed no recurrence across 30 units.",
      },
      diagnosisReview: { state: "approved", at: iso(26, 10, 0), by: "R. Deshmukh" },
      actions: [
        { id: "CA-1", description: "Realign the machining fixture to the 0.02 mm alignment limit.", owner: "M. Fernandes", priority: "High", dueDate: iso(28), status: "Verified", verification: "Dial indicator sweep record" },
        { id: "CA-2", description: "Verify fixture clamping pressure against the specification.", owner: "M. Fernandes", priority: "High", dueDate: iso(28), status: "Verified", verification: "Clamp force verification sheet" },
        { id: "CA-3", description: "Monitor the next three production batches for recurrence.", owner: "R. Deshmukh", priority: "Medium", dueDate: iso(4), status: "Verified", verification: "Batches B-199 to B-201 defect counts" },
      ],
      actionsApproved: true,
      monitoring: [
        { batchId: "B-205", inspections: "110", defects: "1", result: "Pass", notes: "One handling mark, reworked at deburr.", completed: true },
        { batchId: "B-206", inspections: "98", defects: "0", result: "Pass", notes: "No recurrence observed.", completed: true },
        { batchId: "B-207", inspections: "106", defects: "0", result: "Pass", notes: "No recurrence observed.", completed: true },
      ],
      effectiveness: { result: "Effective", rationale: "Defect rate fell from 4.5% before the action to 0.3% across three monitored batches with no recurrence of the scratch pattern.", at: iso(4, 11, 20) },
      timeline: [
        tl(iso(20, 9, 0), "Case created", "MQI-2026-0038 opened for cosmetic Surface Scratches on batch B-199.", "A. Kulkarni", "human"),
        tl(iso(20, 11, 30), "Hypotheses generated", "Fixture misalignment leading at 91%.", "AI Investigation Agent", "agent"),
        tl(iso(26, 10, 0), "Diagnosis approved", "Fixture misalignment confirmed by the quality engineer.", "R. Deshmukh", "human"),
        tl(iso(26, 10, 30), "Corrective action approved", "3-action plan approved.", "R. Deshmukh", "human"),
        tl(iso(4, 11, 20), "Monitoring completed", "Effectiveness assessed as Effective across three batches.", "R. Deshmukh", "human"),
      ],
    }),
  ];
}

/* ------------------------------------------------------------------ */
/*  Audit trail seed                                                   */
/* ------------------------------------------------------------------ */

export const AUDIT_SEED = [
  { id: "AUD-001", at: iso(8, 9, 20), action: "Case created", actor: "A. Kulkarni", actorType: "Human", caseId: "MQI-2026-0042", description: "New defect reported on PMH-88213, batch B-204.", status: "Completed" },
  { id: "AUD-002", at: iso(8, 9, 24), action: "Image analysis completed", actor: "AI Investigation Agent", actorType: "Agent", caseId: "MQI-2026-0042", description: "Surface Scratches detected at 94.2% illustrative confidence, severity Medium.", status: "Completed" },
  { id: "AUD-003", at: iso(8, 9, 31), action: "Evidence retrieved", actor: "AI Investigation Agent", actorType: "Agent", caseId: "MQI-2026-0042", description: "7 records retrieved across 5 source types.", status: "Completed" },
  { id: "AUD-004", at: iso(8, 9, 44), action: "Hypothesis generated", actor: "AI Investigation Agent", actorType: "Agent", caseId: "MQI-2026-0042", description: "4 competing hypotheses scored; tool wear leading at 78%.", status: "Completed" },
  { id: "AUD-005", at: iso(8, 12, 5), action: "Diagnostic check recommended", actor: "AI Investigation Agent", actorType: "Agent", caseId: "MQI-2026-0042", description: "CHK-01 Inspect Tool Geometry recommended as the most informative check.", status: "Completed" },
  { id: "AUD-006", at: iso(8, 13, 40), action: "Diagnostic check approved", actor: "R. Deshmukh", actorType: "Human", caseId: "MQI-2026-0042", description: "CHK-01 approved and released to M. Fernandes.", status: "Completed" },
  { id: "AUD-007", at: iso(7, 13, 25), action: "Diagnosis approved", actor: "S. Iyer", actorType: "Human", caseId: "MQI-2026-0041", description: "Tool wear confirmed as root cause for dimensional deviation on B-203.", status: "Completed" },
  { id: "AUD-008", at: iso(7, 13, 40), action: "Corrective action drafted", actor: "AI Investigation Agent", actorType: "Agent", caseId: "MQI-2026-0041", description: "4-action plan drafted for tool wear; awaiting engineer review.", status: "Completed" },
  { id: "AUD-009", at: iso(6, 16, 48), action: "Case escalated", actor: "AI Investigation Agent", actorType: "Agent", caseId: "MQI-2026-0039", description: "Safety-relevant crack case escalated; leading confidence below threshold.", status: "Escalated" },
  { id: "AUD-010", at: iso(5, 9, 15), action: "Diagnosis rejected", actor: "P. Joshi", actorType: "Human", caseId: "MQI-2026-0040", description: "Material inconsistency hypothesis rejected on first review; returned for additional hardness evidence.", status: "Completed" },
  { id: "AUD-011", at: iso(4, 10, 5), action: "Diagnostic result entered", actor: "M. Fernandes", actorType: "Human", caseId: "MQI-2026-0040", description: "Hardness test supports material inconsistency; lot HT-7719 at 84.6 HRB.", status: "Completed" },
  { id: "AUD-012", at: iso(3, 9, 40), action: "Corrective action approved", actor: "P. Joshi", actorType: "Human", caseId: "MQI-2026-0040", description: "4-action plan approved: lot quarantine, coupon re-test, incoming verification, monitoring.", status: "Completed" },
  { id: "AUD-013", at: iso(4, 11, 20), action: "Monitoring completed", actor: "R. Deshmukh", actorType: "Human", caseId: "MQI-2026-0038", description: "Three monitoring batches recorded; action assessed as Effective.", status: "Completed" },
  { id: "AUD-014", at: iso(2, 14, 2), action: "Evidence retrieval failed", actor: "AI Investigation Agent", actorType: "Agent", caseId: "MQI-2026-0040", description: "Process sheet for second half of B-202 not available; retrieval returned a partial record set.", status: "Failed" },
];

/* ------------------------------------------------------------------ */
/*  Demo scenarios                                                     */
/* ------------------------------------------------------------------ */

const scenarioCase = (overrides) => makeCase(overrides);

export const SCENARIOS = [
  {
    id: "A",
    code: "Scenario A",
    title: "Surface Scratches Due to Fixture Misalignment",
    summary: "Full investigation path from visual inspection to verified fixture realignment.",
    defect: "Surface Scratches",
    severity: "Medium",
    startStage: 2,
    note: "Recommended walkthrough — leads to a fixture misalignment diagnosis.",
    build: () =>
      scenarioCase({
        id: "MQI-2026-0101",
        batchId: "B-204",
        componentId: "PMH-88213",
        stage: 2,
        status: "Under Investigation",
        createdAt: iso(8, 8, 5),
        updatedAt: iso(8, 8, 5),
        description: "Parallel scratch cluster on the machined top face, aligned with the feed direction.",
        timeline: [tl(iso(8, 8, 5), "Case created", "Demo scenario A loaded: surface scratches on batch B-204.", "R. Deshmukh", "human")],
      }),
  },
  {
    id: "B",
    code: "Scenario B",
    title: "Dimensional Deviation Due to Tool Wear",
    summary: "Progressive bore diameter drift resolved through tool geometry measurement.",
    defect: "Dimensional Deviation",
    severity: "High",
    startStage: 4,
    note: "Starts at root cause investigation with evidence already retrieved.",
    build: () =>
      scenarioCase({
        id: "MQI-2026-0102",
        defectCategory: "Dimensional Deviation",
        severity: "High",
        batchId: "B-203",
        machineId: "CNC-12",
        componentId: "PMH-88207",
        stage: 4,
        status: "Under Investigation",
        description: "Bore diameter 0.014 mm above nominal, drifting progressively across the batch.",
        imageUrl: SAMPLE_IMAGES["Dimensional Deviation"],
        vision: {
          category: "Dimensional Deviation",
          confidence: 89.6,
          severity: "High",
          bbox: { x: 0.4, y: 0.38, w: 0.22, h: 0.2 },
          findings: ["Witness mark on the bore entry chamfer.", "Drift is progressive across the batch.", "CMM confirms 0.014 mm deviation on 22 of 104 parts."],
        },
        evidenceIds: ["EVD-110", "EVD-111", "EVD-115", "EVD-108"],
        evidenceRetrieved: true,
        hypotheses: [
          buildHypothesis("Tool Wear", 74, ["EVD-110"], [], ["Tool geometry measurement (CHK-01)"]),
          buildHypothesis("Incorrect Machining Parameters", 47, ["EVD-108"], [], []),
          buildHypothesis("Fixture Misalignment", 33, ["EVD-115"], [], []),
          buildHypothesis("Measurement Variation", 29, [], [], ["Gauge R&R study"]),
        ],
        timeline: [
          tl(iso(8, 8, 10), "Case created", "Demo scenario B loaded: dimensional deviation on CNC-12.", "R. Deshmukh", "human"),
          tl(iso(8, 8, 12), "Evidence retrieved", "4 records retrieved across production, tool life and calibration sources.", "AI Investigation Agent", "agent"),
        ],
      }),
  },
  {
    id: "C",
    code: "Scenario C",
    title: "Burr Formation with Missing Production Records",
    summary: "Investigation blocked by a documentation gap; demonstrates exception handling.",
    defect: "Burr Formation",
    severity: "Medium",
    startStage: 3,
    note: "Evidence retrieval returns a partial record set and flags a missing record.",
    build: () =>
      scenarioCase({
        id: "MQI-2026-0103",
        defectCategory: "Burr Formation",
        severity: "Medium",
        batchId: "B-202",
        machineId: "CNC-11",
        componentId: "PMH-88201",
        stage: 3,
        status: "Under Investigation",
        description: "Rolled burr at the pocket exit edge measured 0.09 mm against a 0.05 mm acceptance limit.",
        imageUrl: SAMPLE_IMAGES["Burr Formation"],
        vision: {
          category: "Burr Formation",
          confidence: 87.2,
          severity: "Medium",
          bbox: { x: 0.22, y: 0.5, w: 0.3, h: 0.18 },
          findings: ["Rolled burr at the pocket exit edge.", "Sealing face affected, 0.05 mm limit applies.", "No burr on the opposite edge."],
        },
        evidenceIds: ["EVD-112", "EVD-113", "EVD-117"],
        evidenceRetrieved: true,
        escalation: {
          reason: "Missing production records",
          detail:
            "The process sheet for the second half of batch B-202 is not available, so parameter verification for 46 of 118 units cannot be evidenced. The investigation cannot proceed to a defensible diagnosis without this record.",
          evidence: ["EVD-117"],
          at: iso(8, 8, 20),
          raisedBy: "AI Investigation Agent",
        },
      }),
  },
  {
    id: "D",
    code: "Scenario D",
    title: "Surface Crack with Conflicting Evidence",
    summary: "Two plausible causes with contradictory records on a safety-relevant defect.",
    defect: "Surface Cracks",
    severity: "Critical",
    startStage: 4,
    note: "Conflicting evidence forces escalation rather than a confident diagnosis.",
    build: () =>
      scenarioCase({
        id: "MQI-2026-0104",
        defectCategory: "Surface Cracks",
        severity: "Critical",
        batchId: "B-201",
        machineId: "CNC-14",
        componentId: "PMH-88196",
        stage: 4,
        status: "Under Investigation",
        description: "Fine branching crack at the pocket corner, approximately 8 mm long. Batch quarantined.",
        imageUrl: SAMPLE_IMAGES["Surface Cracks"],
        vision: {
          category: "Surface Cracks",
          confidence: 71.8,
          severity: "Critical",
          bbox: { x: 0.46, y: 0.46, w: 0.22, h: 0.18 },
          findings: ["Branching discontinuity at the pocket corner.", "Coolant staining around the crack.", "Penetrant confirmation required."],
        },
        evidenceIds: ["EVD-116", "EVD-118", "EVD-120"],
        evidenceRetrieved: true,
        evidenceReviews: { "EVD-116": "Relevant", "EVD-118": "Relevant", "EVD-120": "Relevant" },
        hypotheses: [
          buildHypothesis("Coolant-Related Issue", 52, ["EVD-116"], [], ["Coolant flow measurement"]),
          buildHypothesis("Material Inconsistency", 49, ["EVD-120"], [], ["Microstructure report"]),
          buildHypothesis("Incorrect Machining Parameters", 28, [], ["EVD-120"], []),
        ],
        escalation: {
          reason: "Conflicting evidence",
          detail:
            "Coolant-related cause (52%) and material inconsistency (49%) are separated by 3 points, and the two evidence records disagree on the direction of the thermal signature. The defect family is safety-relevant under QP-140.",
          evidence: ["EVD-116", "EVD-120", "EVD-118"],
          at: iso(8, 8, 30),
          raisedBy: "AI Investigation Agent",
        },
      }),
  },
  {
    id: "E",
    code: "Scenario E",
    title: "Low-Confidence Investigation Requiring Escalation",
    summary: "An unfamiliar defect pattern the agent cannot resolve with available evidence.",
    defect: "Surface Scratches",
    severity: "High",
    startStage: 4,
    note: "All hypotheses stay below 40%; escalation is the correct outcome.",
    build: () =>
      scenarioCase({
        id: "MQI-2026-0105",
        batchId: "B-198",
        machineId: "CNC-11",
        componentId: "PMH-88140",
        stage: 4,
        status: "Under Investigation",
        severity: "High",
        description: "Unfamiliar stippled surface texture with irregular scratch-like marks not previously recorded on this part family.",
        vision: {
          category: "Surface Scratches",
          confidence: 58.4,
          severity: "High",
          bbox: { x: 0.26, y: 0.3, w: 0.4, h: 0.26 },
          findings: ["Pattern does not match the four recorded defect families cleanly.", "Stippling visible between linear marks.", "Image quality insufficient to resolve surface topography."],
        },
        evidenceIds: ["EVD-105", "EVD-109"],
        evidenceRetrieved: true,
        hypotheses: [
          buildHypothesis("Tool Wear", 38, [], ["EVD-105"], ["Tool geometry measurement", "Higher-resolution imaging"]),
          buildHypothesis("Material Inconsistency", 34, [], [], ["Microstructure analysis"]),
          buildHypothesis("Coolant-Related Issue", 31, ["EVD-109"], [], ["Coolant flow verification"]),
          buildHypothesis("Measurement Variation", 24, [], [], ["Gauge R&R study"]),
        ],
        escalation: {
          reason: "Low confidence · unfamiliar defect",
          detail:
            "No hypothesis exceeds 40% confidence, and the defect pattern is not represented in the reviewed knowledge base. The agent cannot recommend a diagnostic check with a meaningful expected information gain.",
          evidence: ["EVD-105", "EVD-109"],
          at: iso(8, 8, 40),
          raisedBy: "AI Investigation Agent",
        },
      }),
  },
];