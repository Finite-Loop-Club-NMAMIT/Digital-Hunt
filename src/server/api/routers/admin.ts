import { createTRPCRouter, protectedProcedure } from "../trpc";
import z from "zod";

type sortDataInput = {
	id: string;
	name: string | null;
	points1: number;
	roundOne: { createdAt: Date } | null;
	roundTwo: { createdAt: Date } | null;
};

const sort = (data: sortDataInput[], round: number) => {
	if (round === 1) {
		data.sort((a: sortDataInput, b: sortDataInput) => {
			const aCreatedAt =
				a.roundOne?.createdAt instanceof Date
					? a.roundOne?.createdAt.toISOString()
					: "";
			const bCreatedAt =
				b.roundOne?.createdAt instanceof Date
					? b.roundOne?.createdAt.toISOString()
					: "";
			if (a.points1 === b.points1)
				return Date.parse(aCreatedAt) - Date.parse(bCreatedAt);
			return b.points1 - a.points1;
		});
	} else {
		data.sort((a: sortDataInput, b: sortDataInput) => {
			const aCreatedAt =
				a.roundTwo?.createdAt instanceof Date
					? a.roundTwo?.createdAt.toISOString()
					: "";
			const bCreatedAt =
				b.roundTwo?.createdAt instanceof Date
					? b.roundTwo?.createdAt.toISOString()
					: "";
			if (a.points1 === b.points1)
				return Date.parse(aCreatedAt) - Date.parse(bCreatedAt);
			return b.points1 - a.points1;
		});
	}
	return data;
};

export const admin = createTRPCRouter({
	getSubmissions: protectedProcedure.query(async ({ ctx }) => {
		try {
			const userId = ctx.session.user.id;
			const user = await ctx.db.user.findUnique({
				where: {
					id: userId,
				},
			});
			if (user?.role === "ORGANIZER") {
				const data = await ctx.db.user.findMany({
					select: {
						id: true,
						name: true,
						points1: true,
						roundOne: {
							select: { createdAt: true },
						},
						roundTwo: { select: { createdAt: true } },
					},
				});

				const roundOneSorted = sort(data, 1);
				const roundTwoSorted = sort(data, 2);
				return {
					roundOneSorted,
					roundTwoSorted,
				};
			} else {
				throw {type:"Not permitted", message:"Oops! you cannot access this resource"};
			}
		} catch (e) {
			console.log(e);
			if(e.type === "Not permitted") throw e.message
			throw new Error("An error occurred!");
		}
	}),
	reduceScore: protectedProcedure
		.input(
			z.object({
				userid: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			try {
				await ctx.db.user.update({
					where: { id: input.userid },
					data: {
						points1: { decrement: 10 },
					},
				});
				return { message: "success" };
			} catch (e) {
				console.log(e);
				throw new Error("An error occurred!");
			}
		}),
});
