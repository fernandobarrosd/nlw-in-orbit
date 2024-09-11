import { and, count, eq, gte, lte, sql } from "drizzle-orm";
import { db } from "../db";
import { goalCompletions, goals } from "../db/schema";
import dayjs from "dayjs";

export async function createGoalCompletionUseCase(goalID: string) {
    const firstDayOfWeek = dayjs()
    .startOf("week")
    .toDate()

    const lastDayOfWeek = dayjs()
    .endOf("week")
    .toDate();

    const goalsCompletionCounts = db
        .$with("goals_completion_counts")
        .as(
            db
            .select({
                goalID: goalCompletions.goalID,
                completionCount: 
                    count(goalCompletions.id)
                    .as("completion_count")
            })
            .from(goalCompletions)
            .groupBy(goalCompletions.goalID)
            .where(and(
                gte(goalCompletions.createdAt, firstDayOfWeek),
                lte(goalCompletions.createdAt, lastDayOfWeek),
                eq(goalCompletions.goalID, goalID)
            ))
        )
    const goalCompletionResult = await db
        .with(goalsCompletionCounts)
        .select({
            diseredWeeklyFrequency: goals.desiredWeeklyFrequency,
            completionCount: sql`
                COALESCE(${goalsCompletionCounts.completionCount}, 0)
            `.mapWith(Number),
            createdAt: goals.createdAt,
        })
        .from(goals)
        .leftJoin(goalsCompletionCounts, eq(goalsCompletionCounts.goalID, goals.id))
        .where(eq(goals.id, goalID))
        .limit(1);

    const [ { completionCount, diseredWeeklyFrequency } ] = goalCompletionResult;

    if (completionCount >= diseredWeeklyFrequency) {
        throw new Error("Goal already completed this week!");
    }

    const goalCompletionSavedResult = await db
        .insert(goalCompletions)
        .values({
            goalID
        }).returning();

    const [ goalCompletionSaved ] = goalCompletionSavedResult;
    return { goalCompletionSaved }
}