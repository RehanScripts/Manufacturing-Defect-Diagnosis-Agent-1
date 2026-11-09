import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ConfirmationModal({
  open,
  onOpenChange,
  title,
  description,
  children,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  tone = "primary",
  onConfirm,
  confirmDisabled = false,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-heading text-[17px] tracking-[-0.01em]">{title}</DialogTitle>
          {description && (
            <DialogDescription className="text-[13px] leading-relaxed">{description}</DialogDescription>
          )}
        </DialogHeader>
        {children && <div className="py-1">{children}</div>}
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {cancelLabel}
          </Button>
          <Button
            onClick={onConfirm}
            disabled={confirmDisabled}
            className={cn(
              tone === "destructive" &&
                "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500"
            )}
          >
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}