import { pgTable, text, integer } from "drizzle-orm/pg-core";
import { createdAt } from "../utils/createdAt";
import { cuid2 } from "../utils/cuid2";


export const goals = pgTable("goals", {
    id: cuid2(),
    title: text("title").notNull(),
    desiredWeeklyFrequency: integer("design_weekly_frequency").notNull(),
    createdAt: createdAt()
});


export const goalCompletions = pgTable("goal_completions", {
    id: cuid2(),
    goalID: text("goal_id")
        .references(() => goals.id)
        .notNull(),
    createdAt: createdAt()
});