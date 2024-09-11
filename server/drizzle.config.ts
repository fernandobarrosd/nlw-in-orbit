import { defineConfig } from "drizzle-kit";
import z from "zod";
import { env } from "./src/env";

export default defineConfig({
    schema: "./src/db/schema.ts",
    dialect: "postgresql",
    out: "./.migrations",
    dbCredentials: {
        url: env.DATABASE_URL
    }
})