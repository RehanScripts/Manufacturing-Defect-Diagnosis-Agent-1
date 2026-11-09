import { createFileRoute, Outlet } from "@tanstack/react-router";
import AppShell from "@/components/layout/AppShell";
import { InvestigationProvider } from "@/lib/investigationStore";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
  head: () => ({
    meta: [{ title: "Manufacturing Quality AI — Defect Investigation" }],
  }),
});

function AppLayout() {
  return (
    <InvestigationProvider>
      <AppShell>
        <Outlet />
      </AppShell>
    </InvestigationProvider>
  );
}