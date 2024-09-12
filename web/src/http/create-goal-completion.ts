export type GoalCompletionCreatedType = {
    id: string;
    createdAt: Date;
    goalID: string
}


export async function createGoalCompletion(goalID: string) : Promise<GoalCompletionCreatedType> {
    const response = await fetch(`http://localhost:3000/goals/${goalID}/completions`,{
        method: "POST"
    });
    const data = await response.json();

    return data.goalCompletionSaved;
}