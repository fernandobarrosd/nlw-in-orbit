import { z } from "zod";

const envSchema = z.object({
    VITE_INORBIT_API_URL: z.string()
});

export const env = envSchema.parse(import.meta.env);