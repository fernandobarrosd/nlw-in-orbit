import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getWeeklyPendingGoalsUseCase } from "../../useCases/get-weekly-pending-goals-use-case";

export const getPendingGoalsRoute : FastifyPluginAsyncZod = async app => {
    app.get("/pending-goals", async (_, reply) => {
        const { pendingGoals } = await getWeeklyPendingGoalsUseCase();
    
        return reply.code(200).send({ pendingGoals });
    });
}