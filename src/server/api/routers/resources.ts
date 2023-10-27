import { getFileNumber } from "~/utils/hash";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { env } from "~/env.mjs";
export const files = createTRPCRouter({
	getFile: protectedProcedure.query(async ({ ctx }) => {
		try {
			const { fileNumber, hash } = getFileNumber(ctx.session.user.id);
			const fileLinks = {
				"0": "1JUMuMtqb-IwUKbjVnMiWaToMpPYx_Psg",
				"1": "1C_OaonobyVeObKoeqmbaMlof2GhuCzAI",
				"2": "1Ul3gROkOv6lclUCVRH5NS7cKftu0S3wX",
				"3": "1-S4ONWCzpyMJDyRz-H4E-9VBRR2gPSJH",
				"4": "1rUf5pCN-K-_v73Hev5ILjn59-IR90DMw",
			};
			const downloadLink =
				"https://drive.google.com/uc?export=download&id=" +
				fileLinks[fileNumber];
			await ctx.db.fileAssigned.create({
				data: {
					user: {
						connect: { id: ctx.session.user.id },
					},
					hash: hash.toString(),
					fileId: fileLinks[fileNumber],
				},
			});
			return downloadLink;
		} catch (e) {
			console.log(e);
			throw "An error occurred!";
		}
	}),
});
