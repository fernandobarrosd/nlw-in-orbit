import { and, count, eq, lte, sql } from "drizzle-orm";
import { db } from "../db";
import { goalCompletions, goals } from "../db/schema";
import dayjs from "dayjs";
import { gte } from "drizzle-orm";


export async function getWeekSummaryUseCase() {
    const lastDayOfWeek = dayjs()
    .endOf("week")
    .toDate();

    const firstDayOfWeek = dayjs()
    .startOf("week")
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

    const goalsCompletedInWeek = db
        .$with("goals_completed_in_week")
        .as(
            db
            .select({
                id: goalCompletions.id,
                title: goals.title,
                completedAt: goalCompletions.createdAt,
                completedAtDate: sql`
                    DATE(${goalCompletions.createdAt})
                `.as("completedAtDate")
            })
            .from(goalCompletions)
            .innerJoin(goals, eq(goals.id, goalCompletions.goalID))
            .where(and(
                gte(goalCompletions.createdAt, firstDayOfWeek),
                lte(goalCompletions.createdAt, lastDayOfWeek)
            ))
        );
    const goalsCompletedByWeekday = db
        .$with("goals_completed_by_weekday")
        .as(
            db
                .select({
                    completedAtDate: goalsCompletedInWeek.completedAtDate,
                    completions: sql`
                        JSON_AGG(
                            JSON_BUILD_OBJECT(
                                'id', ${goalsCompletedInWeek.id},
                                'title', ${goalsCompletedInWeek.title},
                                'completedAt', ${goalsCompletedInWeek.completedAt}
                            )
                        )
                    `.as("completions")
                })
                .from(goalsCompletedInWeek)
                .groupBy(goalsCompletedInWeek.completedAtDate)
        )
    const result = await db
        .with(
            goalsCreatedUpToWeek,
             goalsCompletedInWeek, 
             goalsCompletedByWeekday)
        .select({
            completed: sql`
                (SELECT COUNT(*) FROM ${goalsCompletedInWeek})
            `.mapWith(Number),
            total: sql`
            (SELECT SUM(${goalsCreatedUpToWeek.desiredWeeklyFrequency})
            FROM ${goalsCreatedUpToWeek})
        `.mapWith(Number),
            goalsPerDay: sql`
                JSON_OBJECT_AGG(
                    ${goalsCompletedByWeekday.completedAtDate},
                    ${goalsCompletedByWeekday.completions}
                )
            `
        })
        .from(goalsCompletedByWeekday)


    return {
        summary: result
    };
}