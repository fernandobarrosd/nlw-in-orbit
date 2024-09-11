import { client, db } from ".";
import { goalCompletions, goals } from "./schema";
import dayjs from "dayjs";

async function seed() {
    await db.delete(goalCompletions);
    await db.delete(goals);

    const goalsCreated = await db
        .insert(goals)
        .values([
            {
                title: "Estudar React JS",
                desiredWeeklyFrequency: 3
            },
            {
                title: "Estudar Node JS",
                desiredWeeklyFrequency: 3
            },
            {
                title: "Me exercitar",
                desiredWeeklyFrequency: 3
            }
        ]).returning();

    const startOfWeek = dayjs().startOf("week")
    await db
        .insert(goalCompletions)
        .values([
            {
                goalID: goalsCreated[0].id,
                createdAt: startOfWeek.toDate()
            },
            {
                goalID: goalsCreated[1].id,
                createdAt: startOfWeek.add(1, "day").toDate()
            }
        ])


}

seed()
    .finally(() => client.end());