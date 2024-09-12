import { useQuery, useQueryClient } from "@tanstack/react-query"
import { GoalItem } from "./goal-item"
import { getPendingGoals } from "../http/get-pending-goals"
import { createGoalCompletion } from "../http/create-goal-completion";

export function PendingGoals() {
    const queryClient = useQueryClient();

    const { data: pendingGoals } = useQuery({
        queryKey: ["pending-goals"],
        queryFn: getPendingGoals
    });
    if (!pendingGoals) return null;


    async function handleCompleteGoal(goalID: string) {
        await createGoalCompletion(goalID);
        queryClient.invalidateQueries({ queryKey: ["summary"] });
        queryClient.invalidateQueries({ queryKey: ["pending-goals"] });
    }

    return (
        <div className="flex gap-3 flex-wrap">
            {pendingGoals.map(({ id, title, completionCount, diseredWeeklyFrequency }) => (
                <GoalItem 
                key={id}
                title={title}
                onClick={() => handleCompleteGoal(id)}
                disabled={completionCount >= diseredWeeklyFrequency}/>
            ))}
        </div>
    );
}