import fastify from "fastify";
import { craeteGoalUseCase } from "../useCases/create-goal-use-case";
import z from "zod";
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from "fastify-type-provider-zod";
import { getWeeklyPendingGoalsUseCase } from "../useCases/get-weekly-pending-goals-use-case";
import { createGoalCompletionUseCase } from "../useCases/create-goal-completion-use-case";

const app = fastify().withTypeProvider<ZodTypeProvider>();
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);


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


app.get("/pending-goals", async (_, reply) => {
	const { pendingGoals } = await getWeeklyPendingGoalsUseCase();

	return reply.code(200).send({ pendingGoals });
});


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

async function main() {
	await app.listen({
		port: 3000,
	});
	console.log("Server is running");
}

main();