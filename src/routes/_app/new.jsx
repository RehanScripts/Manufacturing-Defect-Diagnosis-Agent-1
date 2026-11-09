import { createFileRoute } from "@tanstack/react-router";
import NewInvestigationPage from "@/components/investigation/NewInvestigationPage";

export const Route = createFileRoute("/_app/new")({
  component: NewInvestigationPage,
  head: () => ({ meta: [{ title: "New Investigation — Manufacturing Quality AI" }] }),
});