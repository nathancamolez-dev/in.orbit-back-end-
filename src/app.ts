import fastify from 'fastify'
import { completionGoalsRoute } from './http/routes/completion-goal'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { createGoalRoute } from './http/routes/create-goal'
import { pendingGoalsRoute } from './http/routes/pending-goals'
import { getWeekSummaryRoute } from './http/routes/get-week-summary'
import fastifyCors from '@fastify/cors'

export const app = fastify()

app.register(fastifyCors, {
  origin: '*',
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createGoalRoute)
app.register(pendingGoalsRoute)
app.register(completionGoalsRoute)
app.register(getWeekSummaryRoute)
