import { timestamp } from "drizzle-orm/pg-core";

export function createdAt() {
    return timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow();
}