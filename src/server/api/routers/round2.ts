import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { getFileNumber } from '~/utils/hash';
import { env } from '~/env.mjs';
import { Round2Content } from '~/utils/def'; 


const answers = env.ROUND2_ANSWERS



export const round2Router = createTRPCRouter({
    submitForm: protectedProcedure.input(z.object(Round2Content))
        .mutation(async ({ ctx, input }) => {
            const user = await ctx.db.user.findFirst({ where: { id: ctx.session.user.id } })
            if (!user) {
                throw new Error("User not found")
            }
            let points = 0;
            if (input.firstWord === answers.firstWord) {
                points += 20;
            }
            if (input.secondWord === answers.secondWord) {
                points += 20;
            }
            if (input.thirdWord === answers.thirdWord) {
                points += 20;
            }
            if (input.latitude === answers.latitude && input.longitude === answers.longitude) {
                points += 20;
            }
            if (input.hexahue === answers.hexahue) {
                points += 20;
            }
            if (input.asciiResult === answers.asciiResult) {
                points += 20;
            }
            // badge get hash from function
            // const hash=getFileNumber(user.id);
            const hash = getFileNumber(user.name ?? "");

            if (answers.badge!==null && input.badge?.toUpperCase() === answers.badge[hash.fileNumber]) {
                points += 20;
            }

            if (points > user.points2) {
                await ctx.db.user.update({ where: { id: ctx.session.user.id }, data: { points2: points } })
                    .catch((err) => { throw new Error("Error updating points") })

                await ctx.db.roundTwo.upsert({
                    create: {
                        user: { connect: { id: user.id } },
                        firstWord: input.firstWord,
                        secondWord: input.secondWord,
                        thirdWord: input.thirdWord,
                        latitude: input.latitude,
                        longitude: input.longitude,
                        hexahue: input.hexahue,
                        asciiResult: input.asciiResult,
                        badge: input.badge,
                    },
                    update: {
                        firstWord: input.firstWord,
                        secondWord: input.secondWord,
                        thirdWord: input.thirdWord,
                        latitude: input.latitude,
                        longitude: input.longitude,
                        hexahue: input.hexahue,
                        asciiResult: input.asciiResult,
                        badge: input.badge,
                    },
                    where: {
                        userId: user.id
                    }
                }).catch((err) => { throw new Error("Error updating round 2") })
            }

            return [points, user.points2];
        })
})