import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { createGoalCompletionUseCase } from "../../useCases/create-goal-completion-use-case";

export const createGoalCompletionRoute : FastifyPluginAsyncZod = async app => {
    app.post("/goals/:goalID/completions", {
        schema: {
            params: z.object({
                goalID: z.string()
            })
        }
    }, async (req, reply) => {
        const { params: { goalID } } = req;
        const { goalCompletionSaved } = await createGoalCompletionUseCase(goalID);
        return reply.code(201).send({ goalCompletionSaved });
    })
}