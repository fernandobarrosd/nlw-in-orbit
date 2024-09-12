import { env } from "../env";

export type GoalCompletionCreatedType = {
    id: string;
    createdAt: Date;
    goalID: string
}


export async function createGoalCompletion(goalID: string) : Promise<GoalCompletionCreatedType> {
    const response = await fetch(`${env.VITE_INORBIT_API_URL}/goals/${goalID}/completions`,{
        method: "POST"
    });
    const data = await response.json();

    return data.goalCompletionSaved;
}