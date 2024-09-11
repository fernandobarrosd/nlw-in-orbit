import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { craeteGoalUseCase } from "../../useCases/create-goal-use-case";
import z from "zod";

export const createGoalRoute : FastifyPluginAsyncZod = async app => {
    app.post("/goals", {
        schema: {
            body: z.object({
                title: z.string(),
                desiredWeeklyFrequency: z.number().int().min(1).max(7)
            })
        }
    }, async (req, reply) => {
        const { body } = req;
    
        const { goal } = await craeteGoalUseCase(body);
    
        return reply.code(201).send({ goal });
    })
}