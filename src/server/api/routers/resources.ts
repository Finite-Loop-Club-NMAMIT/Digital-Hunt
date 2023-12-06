import { getFileNumber } from "~/utils/hash";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import z from "zod";
export const files = createTRPCRouter({
	getFile: protectedProcedure.query(async ({ ctx }) => {
		try {
            const user = await ctx.db.user.findFirst({
                where: { id: ctx.session.user.id },
              });
        
            if (!user) {
                throw new Error("User not found");
            }

            if(user.points1<140){
                throw new Error("You have not completed Round 1 yet")
            }
			const { fileNumber, hash } = getFileNumber(
				z.string().parse(ctx.session.user.name)
			);
			const fileLinks = [
				"19jR7aUgNCat0fDCCui_Qwe9ddWIvtS5T",
				"1bzzn7Om-EiLBm5tY0Cgeu2x5QD-Iu9RU",
				"13p8FHL5HbOyqr7XrJ0wXwmFGj7FDwaUf",
				"1bXNPisJFkHJvB2db4JdfocZwmB9fka8y",
				"159OOP2z35Tt526TPSVKi1EHRPL36k1ck",
			];
			const downloadLink =
				"https://drive.google.com/uc?export=download&id=" +
				fileLinks[fileNumber];

			const hasAlreadyDownloaded = await ctx.db.fileAssigned.findUnique({
				where: {
					userId: ctx.session.user.id,
				},
			});
			if (!hasAlreadyDownloaded) {
				await ctx.db.fileAssigned.create({
					data: {
						user: {
							connect: { id: ctx.session.user.id },
						},
						hash: hash.toString(),
						fileId: z.string().parse(fileLinks[fileNumber]),
					},
				});
                await ctx.db.roundTwo.upsert({
                    create:{
                        user: { connect: { id: ctx.session.user.id } }
                    },
                    update:{

                    },
                    where:{
                        userId: ctx.session.user.id
                    }})
			}
			return downloadLink;
		} catch (e) {
			console.log(e);
            return {error:e as Error}
		}
	}),
});
