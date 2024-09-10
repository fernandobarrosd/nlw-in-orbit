import dayjs from "dayjs";
import { db } from "../db";
import { goalCompletions, goals } from "../db/schema";
import { and, count, eq, gte, lte, sql } from "drizzle-orm";


export async function getWeeklyPendingGoalsUseCase() {
    const firstDayOfWeek = dayjs()
    .startOf("week")
    .toDate()

    const lastDayOfWeek = dayjs()
    .endOf("week")
    .toDate();

    
    const goalsCreatedUpToWeek = db
        .$with("goals_created_up_to_week")
        .as(
            db.select({
                id: goals.id,
                title: goals.title,
                desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
                createdAt: goals.createdAt
            })
            .from(goals)
            .where(lte(goals.createdAt, lastDayOfWeek))
        );

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
                lte(goalCompletions.createdAt, lastDayOfWeek)
            ))
        )
    const pendingGoals = await db
    .with(
        goalsCreatedUpToWeek,
    goalsCompletionCounts)
    .select({
        id: goalsCreatedUpToWeek.id,
        title: goalsCreatedUpToWeek.title,
        diseredWeeklyFrequency: goalsCreatedUpToWeek.desiredWeeklyFrequency,
        completionCount: sql/*sql*/`
            COALESCE(${goalsCompletionCounts.completionCount}, 0)
        `.mapWith(Number),
        createdAt: goalsCreatedUpToWeek.createdAt,
        
    })
    .from(goalsCreatedUpToWeek)
    .leftJoin(goalsCompletionCounts, 
        eq(goalsCompletionCounts.goalID, goalsCreatedUpToWeek.id))
        .toSQL();
    return {
        pendingGoals
    }
}