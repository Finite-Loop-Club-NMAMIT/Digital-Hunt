import { RoundOne, RoundTwo, User } from '@prisma/client';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import z, { string } from "zod"

type sortDataInput = {
  id: string,
  name: string | null,
  points: number,
  roundOne: { createdAt: Date } | null
  roundTwo: { createdAt: Date } | null
}
const sort = (data: sortDataInput[], round: number) => {
  if (round == 1) {
    data.sort((a: sortDataInput, b: sortDataInput) => {
      if (a.points == b.points) return Date.parse(`'${a.roundOne?.createdAt}'`) - Date.parse(`'${b.roundOne?.createdAt}'`);
      return b.points - a.points;
    })
  }
  else
    data.sort((a: sortDataInput, b: sortDataInput) => {
      if (a.points == b.points) return Date.parse((`'${a.roundTwo?.createdAt}'`)) - Date.parse(`'${b.roundTwo?.createdAt}'`);
      return b.points - a.points;
    })
  return data
}
export const admin = createTRPCRouter({
  getSubmissions: protectedProcedure.query(async ({ ctx, input }) => {
    try {
      const data = await ctx.db.user.findMany({
        select: {
          id: true,
          name: true,
          points: true,
          roundOne: {
            select: { createdAt: true },
          },
          roundTwo: { select: { createdAt: true } }
        }
      })

      const roundOneSorted = sort(data, 1)
      const roundTwoSorted = sort(data, 2)
      return {
        roundOneSorted,
        roundTwoSorted
      }
    }
    catch (e) {
      console.log(e)
      throw "An error occurred!"
    }
  }),
  reduceScore: protectedProcedure.input(z.object({
    userid: z.string()
  })).mutation(async ({ ctx, input }) => {
    try {
      await ctx.db.user.update({
        where: { id: input.userid },
        data: {
          points: { decrement: 10 }
        }
      })
      return { message: "success" }
    } catch (e) {
      console.log(e)
      throw "An error occurred!"
    }
  })
});