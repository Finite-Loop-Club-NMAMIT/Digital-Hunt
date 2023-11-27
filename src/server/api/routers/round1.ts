import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { env } from "~/env.mjs";
import { Round1Content } from "~/utils/def";

interface Round1Correct {
    hiddenRoute?: boolean;
    loginRoute?: boolean;
    shifts?: boolean;
    playfairKey?: boolean;
    passcode?: boolean;
    captchaSolved?: boolean;
    hackerName?: boolean;
    hackerLocation?: boolean;
    hackerPin?: boolean;
    directEntry?: boolean;
  }
  

const answers=env.ROUND1_ANSWERS
export const round1Router = createTRPCRouter({
  submitForm: protectedProcedure.input(z.object(Round1Content))
  .mutation(async ({ctx,input})=>{
    const user= await ctx.db.user.findFirst({where:{id:ctx.session.user.id}})
    if(!user){
        throw new Error("User not found")
    }
    let points=0;
    const correct:Round1Correct={}
    if(input.hiddenRoute?.replace("/","")===answers.hiddenRoute){
        points+=20;
        correct.hiddenRoute=true;
    }
    if(input.loginRoute?.replace("/","")===answers.loginRoute){
        points+=20;
        correct.loginRoute=true;
    }
    if(input.shifts===answers.shifts){
        points+=20;
        correct.shifts=true;
    }
    if(input.playfairKey?.toLowerCase()===answers.playfairKey){
        points+=20;
        correct.playfairKey=true;
    }
    if(input.passcode?.toLowerCase()===answers.passcode){
        points+=20;
        correct.passcode=true;
    }
    if(input.captchaSolved===answers.captchaSolved){
        points+=20;
        correct.captchaSolved=true;
    }
    if(input.hackerName?.toLowerCase()===answers.hackerName && input.hackerLocation?.replace(",","").replace(" ","")===answers.hackerLocation?.replace(",","").replace(" ","") && input.hackerPin===answers.hackerPin){
        points+=20;
    }
    if(input.hackerName?.toLowerCase()===answers.hackerName){
        correct.hackerName=true;
    }
    if(input.hackerLocation?.replace(",","").replace(" ","")===answers.hackerLocation?.replace(",","").replace(" ","")){
        correct.hackerLocation=true;
    }
    if(input.hackerPin===answers.hackerPin){
        correct.hackerPin=true;
    }
    if(input.directEntry===answers.directEntry){
        points=140;
        correct.directEntry=true;
    }

      if (points > user.points1) {
        await ctx.db.user
          .update({
            where: { id: ctx.session.user.id },
            data: { points1: points },
          })
          .catch(() => {
            throw new Error("Error updating points");
          });
        await ctx.db.roundOne
          .create({
            data: {
              hiddenRoute: input.hiddenRoute,
              loginRoute: input.loginRoute,
              shifts: input.shifts,
              playfairKey: input.playfairKey,
              passcode: input.passcode,
              captchaSolved: input.captchaSolved,
              hackerName: input.hackerName,
              hackerLocation: input.hackerLocation,
              hackerPin: input.hackerPin,
              directEntry: input.directEntry,
              user: { connect: { id: ctx.session.user.id } },
            },
          })
          .catch(() => {
            throw new Error("Error creating round 1 entry");
          });
      }
      return {points,maxPoints:user.points1,correct};
    }),

  getHint: protectedProcedure
    .input(
      z.object({
        hintNo: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findFirst({
        where: { id: ctx.session.user.id },
      });

      if (!user) {
        throw new Error("User not found");
      }

      const hintNumber = input.hintNo.toString();

      const hintTaken = (user.ROneHints as Record<string, boolean>)?.[
        hintNumber
      ] as boolean | undefined;

      if (hintTaken === undefined) {
        try {
          await ctx.db.user.update({
            where: { id: ctx.session.user.id },
            data: {
              minusPoints1: {
                decrement: 10,
              },
              ROneHints: {
                ...(user.ROneHints as Record<string, boolean>),
                [hintNumber]: true,
              },
            },
          });
        } catch (error) {
          throw new Error("Error updating hints");
        }
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return env.HINT_R1[hintNumber as keyof typeof env.HINT_R1];
    }),
});
