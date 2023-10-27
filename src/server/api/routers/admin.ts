import { createTRPCRouter, protectedProcedure } from '../trpc';
import z from "zod";

type sortDataInput = {
  id: string;
  name: string | null;
  points1: number; 
  points2: number; 
  minusPoints1: number;
    minusPoints2: number;
  roundOne: { createdAt: Date ,updatedAt:Date } | null;
  roundTwo: { createdAt: Date, updatedAt:Date } | null;
};

const sort = (data: sortDataInput[], round: number) => {
  if (round === 1) {
    data.sort((a: sortDataInput, b: sortDataInput) => {
      const aCreatedAt = a.roundOne?.updatedAt instanceof Date ? a.roundOne?.updatedAt.toISOString() : '';
      const bCreatedAt = b.roundOne?.updatedAt instanceof Date ? b.roundOne?.updatedAt.toISOString() : '';
      if (a.points1 -a.minusPoints1 === b.points1-b.minusPoints1) return Date.parse(aCreatedAt) - Date.parse(bCreatedAt);
      return (b.points1 - b.minusPoints1) - (a.points1-a.minusPoints1);
    });
  } else {
    data.sort((a: sortDataInput, b: sortDataInput) => {
      const aCreatedAt = a.roundTwo?.updatedAt instanceof Date ? a.roundTwo?.updatedAt.toISOString() : '';
      const bCreatedAt = b.roundTwo?.updatedAt instanceof Date ? b.roundTwo?.updatedAt.toISOString() : '';
      if (a.points2 - a.minusPoints2 === b.points2 - b.minusPoints2) return Date.parse(aCreatedAt) - Date.parse(bCreatedAt);
      return (b.points2 - b.minusPoints2) - (a.points2 - a.minusPoints2);
    });
  }
  return data;
};

export const admin = createTRPCRouter({
  getSubmissions: protectedProcedure.query(async ({ ctx }) => {
    try {
      const data = await ctx.db.user.findMany({
        select: {
          id: true,
          name: true,
          points1: true,
          points2: true,
          minusPoints1: true,
          minusPoints2: true,
          roundOne: {
            select: { createdAt: true ,updatedAt:true},
          },
          roundTwo: { select: { createdAt: true,updatedAt:true } }
        }
      });

      const roundOneSorted = sort(data, 1);
      const roundTwoSorted = sort(data, 2);
      return {
        roundOneSorted,
        roundTwoSorted
      };
    } catch (e) {
      console.log(e);
      throw new Error("An error occurred!");
    }
  }),
  reduceScoreRound1: protectedProcedure.input(z.object({
    userid: z.string()
  })).mutation(async ({ ctx, input }) => {
    try {
      await ctx.db.user.update({
        where: { id: input.userid },
        data: {
          minusPoints1: { decrement: 10 }
        }
      });
      return { message: "success" };
    } catch (e) {
      console.log(e);
      throw new Error("An error occurred!");
    }
  }),
  reduceScoreRound2: protectedProcedure.input(z.object({
    userid: z.string()
  })).mutation(async ({ ctx, input }) => {
    try {
      await ctx.db.user.update({
        where: { id: input.userid },
        data: {
          minusPoints2: { decrement: 10 }
        }
      });
      return { message: "success" };
    } catch (e) {
      console.log(e);
      throw new Error("An error occurred!");
    }
  })
});
