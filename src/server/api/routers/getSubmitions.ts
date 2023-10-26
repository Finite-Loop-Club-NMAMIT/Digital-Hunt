import { RoundOne, RoundTwo, User } from '@prisma/client';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import z from "zod"

type sortDataInput = {
  id: string,
  name: string | null,
  points: number,
  roundOne: { updatedAt: Date } | null
  roundTwo: { updatedAt: Date } | null
}
const sort = (data: sortDataInput[], round: number) => {
  if (round == 1) {
    data.sort((a: sortDataInput, b: sortDataInput) => {
      if (a.points == b.points) return Date.parse(`'${a.roundOne?.updatedAt}'`) - Date.parse(`'${b.roundOne?.updatedAt}'`);
      return b.points - a.points;
    })
  }
  else
    data.sort((a: sortDataInput, b: sortDataInput) => {
      if (a.points == b.points) return Date.parse((`'${a.roundTwo?.updatedAt}'`)) - Date.parse(`'${b.roundTwo?.updatedAt}'`);
      return b.points - a.points;
    })
  return data
}
export const submissionsRouter= createTRPCRouter({
  getSubmissions: protectedProcedure.query(async ({ ctx, input }) => {
    const data = await ctx.db.user.findMany({
      select: {
        id: true,
        name: true,
        points: true,
        roundOne: {
          select: { updatedAt: true },
        },
        roundTwo: { select: { updatedAt: true } }
      }
    })

    const roundOneSorted = sort(data, 1)
    const roundTwoSorted = sort(data, 2)
    return {
      roundOneSorted,
      roundTwoSorted
    }
  })
});