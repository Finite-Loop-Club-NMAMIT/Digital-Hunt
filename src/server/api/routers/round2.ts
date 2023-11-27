import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { getFileNumber } from "~/utils/hash";
import { env } from "~/env.mjs";
import { Round2Content } from "~/utils/def";

const answers = env.ROUND2_ANSWERS;

interface Round2Correct {
    firstWord?: boolean;
    secondWord?: boolean;
    thirdWord?: boolean;
    hexahue?: boolean;
    latitude?: boolean;
    longitude?: boolean;
    asciiResult?: boolean;
    badge?: boolean;
}

export const round2Router = createTRPCRouter({
    submitForm: protectedProcedure
        .input(z.object(Round2Content))
        .mutation(async ({ ctx, input }) => {
            const user = await ctx.db.user.findFirst({
                where: { id: ctx.session.user.id },
            });
            if (!user) {
                throw new Error("User not found");
            }
            let points = 0;
            const correct: Round2Correct = {};
            if (input.firstWord === answers.firstWord) {
                points += 20;
                correct.firstWord = true;
            }
            if (input.secondWord === answers.secondWord) {
                points += 20;
                correct.secondWord = true;
            }
            if (input.thirdWord === answers.thirdWord) {
                points += 20;
                correct.thirdWord = true;
            }
            if (
                input.latitude === answers.latitude &&
                input.longitude === answers.longitude
            ) {
                points += 20;
            }
            if (input.latitude === answers.latitude) {
                correct.latitude = true;
            }
            if (input.longitude === answers.longitude) {
                correct.longitude = true;
            }
            if (input.hexahue === answers.hexahue) {
                points += 20;
                correct.hexahue = true;
            }
            if (input.asciiResult === answers.asciiResult) {
                points += 20;
                correct.asciiResult = true;
            }
            // badge get hash from function
            // const hash=getFileNumber(user.id);
            const hash = getFileNumber(user.name ?? "");

            if (
                answers.badge !== null &&
                input.badge?.toUpperCase() === answers.badge[hash.fileNumber]
            ) {
                points += 20;
                correct.badge = true;
            }

            if (points > user.points2) {
                await ctx.db.user
                    .update({
                        where: { id: ctx.session.user.id },
                        data: { points2: points },
                    })
                    .catch(() => {
                        throw new Error("Error updating points");
                    });

                await ctx.db.roundTwo
                    .upsert({
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
                            userId: user.id,
                        },
                    })
                    .catch(() => {
                        throw new Error("Error updating round 2");
                    });
            }

            return {points, maxPoints:user.points2, correct};
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

            const hintTaken = (user.RTwoHints as Record<string, boolean>)?.[
                hintNumber
            ] as boolean | undefined;

            if (hintTaken === undefined) {
                try {
                    await ctx.db.user.update({
                        where: { id: ctx.session.user.id },
                        data: {
                            minusPoints2: {
                                decrement: 10,
                            },
                            RTwoHints: {
                                ...(user.RTwoHints as Record<string, boolean>),
                                [hintNumber]: true,
                            },
                        },
                    });
                } catch (error) {
                    throw new Error("Error updating hints");
                }
            }

            return env.HINT_R2[hintNumber as keyof typeof env.HINT_R2];
        }),
});
