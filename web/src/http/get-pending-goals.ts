export type PendingGoalType = {
    id: string;
    title: string;
    diseredWeeklyFrequency: number;
    completionCount: number;
    createdAt: string;
}


export async function getPendingGoals() : Promise<PendingGoalType[]> {
    const response = await fetch("http://localhost:3000/pending-goals");
    const data = await response.json();

    return data.pendingGoals;
}