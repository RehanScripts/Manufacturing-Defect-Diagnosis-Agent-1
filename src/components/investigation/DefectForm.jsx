import { useState } from "react";
import { ImagePlus, Upload, X } from "lucide-react";
import { Image } from "@/components/ui/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DEFECT_CATEGORIES,
  SEVERITIES,
  LINES,
  MACHINES,
  ENGINEERS,
  FACILITY,
} from "@/lib/mockData";
import { SAMPLE_IMAGES } from "@/lib/assets";

const todayValue = () => new Date().toISOString().slice(0, 10);

export default function DefectForm({
  initial = {},
  onSubmit,
  onSaveDraft,
  submitLabel = "Start Investigation",
  draftLabel = "Save Draft",
}) {
  const [form, setForm] = useState({
    componentId: initial.componentId || "PMH-88213",
    batchId: initial.batchId || "B-204",
    line: initial.line || LINES[1],
    machineId: initial.machineId || MACHINES[0],
    inspectedAt: (initial.inspectedAt || new Date().toISOString()).slice(0, 10),
    defectCategory: initial.defectCategory || DEFECT_CATEGORIES[0],
    severity: initial.severity || "Medium",
    description: initial.description || "",
    inspector: initial.inspector || ENGINEERS[1],
    imageUrl:
      initial.imageUrl ||
      SAMPLE_IMAGES[initial.defectCategory || DEFECT_CATEGORIES[0]] ||
      SAMPLE_IMAGES["Surface Scratches"],
    imageName: initial.imageName || "sample-inspection.png",
  });
  const [error, setError] = useState("");

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const setCategory = (value) =>
    setForm((prev) => {
      const isSample = !prev.imageUrl || Object.values(SAMPLE_IMAGES).includes(prev.imageUrl);
      return {
        ...prev,
        defectCategory: value,
        imageUrl: isSample ? SAMPLE_IMAGES[value] : prev.imageUrl,
        imageName: isSample ? "sample-inspection.png" : prev.imageName,
      };
    });

  const handleFile = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const apply = (imageUrl) =>
      setForm((prev) => ({ ...prev, imageUrl, imageName: file.name }));
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result || "");
      // Downscale in the browser so the stored demo state stays within local storage limits.
      const image = new window.Image();
      image.onload = () => {
        const max = 1200;
        const scale = Math.min(1, max / Math.max(image.width, image.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(image.width * scale);
        canvas.height = Math.round(image.height * scale);
        const context = canvas.getContext("2d");
        if (!context) {
          apply(dataUrl);
          return;
        }
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        apply(canvas.toDataURL("image/jpeg", 0.82));
      };
      image.onerror = () => apply(dataUrl);
      image.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  const validate = () => {
    if (!form.componentId.trim() || !form.batchId.trim()) {
      setError("Component ID and production batch ID are required.");
      return false;
    }
    if (form.description.trim().length < 10) {
      setError("Add a short defect description (at least 10 characters).");
      return false;
    }
    setError("");
    return true;
  };

  const submit = (handler) => () => {
    if (!handler) return;
    if (!validate()) return;
    const inspectedAt = form.inspectedAt
      ? new Date(`${form.inspectedAt}T09:00:00Z`).toISOString()
      : new Date().toISOString();
    handler({ ...form, inspectedAt });
  };

  return (
    <div className="grid gap-4 xl:grid-cols-[1.35fr_1fr]">
      <div className="panel p-4 sm:p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="font-heading text-[14px] font-semibold tracking-[-0.01em] text-[#0B2138]">
              Defect report
            </h2>
            <p className="mt-0.5 text-[11.5px] text-muted-foreground">
              {FACILITY} · precision metal housing, CNC machining
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <Label className="mb-1.5 block text-[11.5px] font-medium">Component name</Label>
            <Input value="Precision Metal Housing" readOnly className="h-9 bg-secondary/60 text-[12.5px]" />
          </div>
          <div>
            <Label className="mb-1.5 block text-[11.5px] font-medium">Component ID</Label>
            <Input
              value={form.componentId}
              onChange={(event) => set("componentId", event.target.value)}
              className="h-9 text-[12.5px]"
              placeholder="PMH-88213"
            />
          </div>
          <div>
            <Label className="mb-1.5 block text-[11.5px] font-medium">Production batch ID</Label>
            <Input
              value={form.batchId}
              onChange={(event) => set("batchId", event.target.value)}
              className="h-9 text-[12.5px]"
              placeholder="B-204"
            />
          </div>
          <div>
            <Label className="mb-1.5 block text-[11.5px] font-medium">Manufacturing line</Label>
            <Select value={form.line} onValueChange={(value) => set("line", value)}>
              <SelectTrigger className="h-9 text-[12.5px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LINES.map((line) => (
                  <SelectItem key={line} value={line}>
                    {line}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="mb-1.5 block text-[11.5px] font-medium">Machine ID</Label>
            <Select value={form.machineId} onValueChange={(value) => set("machineId", value)}>
              <SelectTrigger className="h-9 text-[12.5px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {MACHINES.map((machine) => (
                  <SelectItem key={machine} value={machine}>
                    {machine}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="mb-1.5 block text-[11.5px] font-medium">Inspection date</Label>
            <Input
              type="date"
              value={form.inspectedAt}
              onChange={(event) => set("inspectedAt", event.target.value)}
              className="h-9 text-[12.5px]"
            />
          </div>
          <div>
            <Label className="mb-1.5 block text-[11.5px] font-medium">Defect category</Label>
            <Select value={form.defectCategory} onValueChange={setCategory}>
              <SelectTrigger className="h-9 text-[12.5px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {DEFECT_CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="mb-1.5 block text-[11.5px] font-medium">Severity</Label>
            <Select value={form.severity} onValueChange={(value) => set("severity", value)}>
              <SelectTrigger className="h-9 text-[12.5px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SEVERITIES.map((severity) => (
                  <SelectItem key={severity} value={severity}>
                    {severity}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="sm:col-span-2">
            <Label className="mb-1.5 block text-[11.5px] font-medium">Defect description</Label>
            <Textarea
              value={form.description}
              onChange={(event) => set("description", event.target.value)}
              rows={3}
              className="text-[12.5px]"
              placeholder="Describe the defect, its location on the part, and the inspection conditions."
            />
          </div>
          <div>
            <Label className="mb-1.5 block text-[11.5px] font-medium">Inspector name</Label>
            <Select value={form.inspector} onValueChange={(value) => set("inspector", value)}>
              <SelectTrigger className="h-9 text-[12.5px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ENGINEERS.map((engineer) => (
                  <SelectItem key={engineer} value={engineer}>
                    {engineer}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {error && (
          <p className="mt-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-[12px] text-red-700">
            {error}
          </p>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-4">
          {onSubmit && (
            <Button className="bg-[#2563EB] hover:bg-[#1D4FD8]" onClick={submit(onSubmit)}>
              {submitLabel}
            </Button>
          )}
          {onSaveDraft && (
            <Button variant="outline" onClick={submit(onSaveDraft)}>
              {draftLabel}
            </Button>
          )}
          <p className="text-[10.5px] text-muted-foreground">
            Prototype only — no records are written to a production system.
          </p>
        </div>
      </div>

      <div className="panel p-4 sm:p-5">
        <h2 className="font-heading text-[14px] font-semibold tracking-[-0.01em] text-[#0B2138]">
          Inspection image
        </h2>
        <p className="mt-0.5 text-[11.5px] text-muted-foreground">
          Uploaded images are previewed locally in the browser.
        </p>

        <div className="mt-3 overflow-hidden rounded-lg border border-border bg-secondary/40">
          {form.imageUrl ? (
            <div className="relative">
              <Image
                src={form.imageUrl}
                alt="Uploaded defect inspection"
                className="h-[220px] w-full object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  set("imageUrl", "");
                  set("imageName", "");
                }}
                className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-md bg-white/90 text-slate-700 shadow-sm hover:bg-white"
                aria-label="Remove image"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex h-[220px] flex-col items-center justify-center gap-2 text-muted-foreground">
              <ImagePlus className="h-6 w-6" />
              <p className="text-[11.5px]">No image selected</p>
            </div>
          )}
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <Button variant="outline" size="sm" asChild>
            <label htmlFor="defect-image-input" className="cursor-pointer">
              <Upload className="mr-1.5 h-3.5 w-3.5" />
              Choose image
            </label>
          </Button>
          <input
            id="defect-image-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFile}
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              setForm((prev) => ({
                ...prev,
                imageUrl: SAMPLE_IMAGES[prev.defectCategory] || SAMPLE_IMAGES["Surface Scratches"],
                imageName: "sample-inspection.png",
              }))
            }
          >
            Use sample image
          </Button>
        </div>

        {form.imageName && (
          <p className="mt-2 truncate text-[11px] text-muted-foreground">File: {form.imageName}</p>
        )}
      </div>
    </div>
  );
}