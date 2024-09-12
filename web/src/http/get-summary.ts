import { env } from "../env";

export type SummaryType = {
    completed: number;
    total: number;
    goalsPerDay: (Record<string, {
      id: string;
      title: string;
      completedAt: string;}[]> ) | null
}


export async function getSummary() : Promise<SummaryType> {
    const response = await fetch(`${env.VITE_INORBIT_API_URL}/summary`);
    const data = await response.json();

    return data.summary
}