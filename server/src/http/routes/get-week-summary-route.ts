import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getWeekSummaryUseCase } from "../../useCases/get-week-summary-use-case";

export const getWeekSummaryRoute : FastifyPluginAsyncZod = async app => {
    app.get("/summary", async (req, reply) => {
        const { summary } = await getWeekSummaryUseCase();
        return reply.code(200).send({ summary });
    });
};