import { createTRPCRouter, protectedProcedure } from "../trpc";

export const leaderboardRouter = createTRPCRouter({
  getSubmissions: protectedProcedure.query(async ({ ctx }) => {
    try {
      const userId = ctx.session.user.id;
      const user = await ctx.db.user.findUnique({
        where: {
          id: userId,
        },
      });
      if (user?.role !== "ORGANIZER")
        throw {
          type: "Not permitted",
          message: "Oops! you cannot access this resource",
        };
      const data = await ctx.db.user.findMany({
        where: {
          role: "PARTICIPANT",
        },
        select: {
          id: true,
          name: true,
          points1: true,
          points2: true,
          minusPoints1: true,
          minusPoints2: true,
        },
      });

      const usersWithTotalPoints = data.map((user) => ({
        ...user,
        totalPoints:
          user.points1 + user.points2 + user.minusPoints1 + user.minusPoints2,
      }));

      const sortedData = usersWithTotalPoints.sort(
        (a, b) => b.totalPoints - a.totalPoints,
      );

      return sortedData.map((user) => ({
        id: user.id,
        name: user.name,
        pointsGained: user.points1 + user.points2,
        pointsLost: user.minusPoints1 + user.minusPoints2,
        totalPoints: user.totalPoints,
        roundOne: user.points1 === 140,
        roundTwo: user.points2 === 140,
      }));
    } catch (e) {
      console.log(e);
      throw new Error("An error occurred!");
    }
  }),
});
