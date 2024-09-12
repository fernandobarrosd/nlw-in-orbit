import { db } from "../db";
import { goals } from "../db/schema";

type CreateGoalRequest = {
    title: string;
    desiredWeeklyFrequency: number
}


export async function craeteGoalUseCase({ title, desiredWeeklyFrequency }: CreateGoalRequest) {
    const result = await db.insert(goals).values({
        title,
        desiredWeeklyFrequency
    }).returning();

    const [ goal ] = result;
    return {

        goal
    }
}