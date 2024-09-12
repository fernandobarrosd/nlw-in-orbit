import { Dialog } from "./components/ui/dialog";
import { CreateGoalDialog } from "./components/create-goal-dialog";
import { EmptyGoals } from "./components/empty-goals";
import { Summary } from "./components/summary";
import { useQuery } from "@tanstack/react-query";
import { getSummary } from "./http/get-summary";
import { Toaster } from "sonner";

export function App() {
  const { data: summary } = useQuery({
    queryKey: ["summary"],
    queryFn: getSummary,
    staleTime: 1000 * 60
  });

  return (
    <Dialog>
      <Toaster richColors position="top-right" closeButton theme="dark"/>
      {summary && summary.total > 0 ? <Summary/> : <EmptyGoals/>}
      <CreateGoalDialog/>
    </Dialog>
  )
}