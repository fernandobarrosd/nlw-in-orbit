import { env } from "../env";

export type PendingGoalType = {
    id: string;
    title: string;
    diseredWeeklyFrequency: number;
    completionCount: number;
    createdAt: string;
}


export async function getPendingGoals() : Promise<PendingGoalType[]> {
    const response = await fetch(`${env.VITE_INORBIT_API_URL}/pending-goals`);
    const data = await response.json();

    return data.pendingGoals;
}