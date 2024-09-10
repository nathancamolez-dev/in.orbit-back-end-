import z from 'zod'
import { app } from '../../app'
import { createGoal } from '../../features/create-goal'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { getWeekPendingGoals } from '../../features/get-week-pending-goals'
import { createGoalCompletion } from '../../features/create-goal-completion'

export async function GoalsRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/goals',
    {
      schema: {
        body: z.object({
          title: z.string(),
          desiredWeeklyFrequency: z.number().int().min(1).max(5),
        }),
      },
    },
    async request => {
      const { title, desiredWeeklyFrequency } = request.body
      await createGoal({
        title,
        desiredWeeklyFrequency,
      })
    }
  )

  app.withTypeProvider<ZodTypeProvider>().get('/pending-goals', async () => {
    const { pendingGoals } = await getWeekPendingGoals()
    return {
      pendingGoals,
    }
  })

  app.withTypeProvider<ZodTypeProvider>().post(
    '/completions',
    {
      schema: {
        body: z.object({
          goalId: z.string(),
        }),
      },
    },
    async request => {
      const { goalId } = request.body
      await createGoalCompletion({
        goalId,
      })
    }
  )
}
