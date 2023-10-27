import { getFileNumber } from "~/utils/hash";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import z from "zod";
export const files = createTRPCRouter({
	getFile: protectedProcedure.query(async ({ ctx }) => {
		try {
			const { fileNumber, hash } = getFileNumber(z.string().parse(ctx.session.user.name));
			const fileLinks = [
				"1JUMuMtqb-IwUKbjVnMiWaToMpPYx_Psg",
				"1C_OaonobyVeObKoeqmbaMlof2GhuCzAI",
				"1Ul3gROkOv6lclUCVRH5NS7cKftu0S3wX",
				"1-S4ONWCzpyMJDyRz-H4E-9VBRR2gPSJH",
				"1rUf5pCN-K-_v73Hev5ILjn59-IR90DMw",
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
			}
			return downloadLink;
		} catch (e) {
			console.log(e);
			throw "An error occurred!";
		}
	}),
});
