import { createId } from "@paralleldrive/cuid2";
import { text } from "drizzle-orm/pg-core";

export function cuid2() {
    return text("id").primaryKey().$defaultFn(() => createId())
}