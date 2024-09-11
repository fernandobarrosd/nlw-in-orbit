import { Dialog } from "./components/ui/dialog";
import { CreateGoalDialog } from "./components/create-goal-dialog";
//import { EmptyGoals } from "./components/empty-goals";
import { Summary } from "./components/summary";


export function App() {
  return (
    <Dialog>
      {/* <EmptyGoals/> */}
      <Summary/>
      <CreateGoalDialog/>
    </Dialog>
  )
}