import fastify from "fastify";
import { 
	serializerCompiler, 
	validatorCompiler, 
	type ZodTypeProvider } from "fastify-type-provider-zod";
	
import { createGoalRoute } from "./routes/create-goal-route";
import { createGoalCompletionRoute } from "./routes/create-goal-completion-route";
import { getPendingGoalsRoute } from "./routes/get-peding-goals-route";
import { getWeekSummaryRoute } from "./routes/get-week-summary-route";
import fastifyCors from "@fastify/cors";
import { env } from "../env";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
	origin: env.ORIGIN_URL
})
app.register(createGoalRoute);
app.register(getPendingGoalsRoute);
app.register(createGoalCompletionRoute);
app.register(getWeekSummaryRoute);

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);


async function main() {
	await app.listen({
		port: env.PORT || 3000,
	});
	console.log("Server is running");
}

main();