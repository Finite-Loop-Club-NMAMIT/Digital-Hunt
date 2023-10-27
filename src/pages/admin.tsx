import { useSession } from "next-auth/react";
import { z } from "zod";
import { api } from "~/utils/api";

export default function Instagram() {
	const { data: sessionData } = useSession();
	const reduceScore = api.admin.reduceScore.useMutation();
	const getSubmissions = api.admin.getSubmissions.useQuery();
	// function handleclick(e: Event) {
	function handleclick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		// reduceScore.mutate({ userid: z.string().parse(e.target.dataset.userid) })
		const userId = (e.target as HTMLElement)?.dataset?.userid;
		if (userId) reduceScore.mutate({ userid: z.string().parse(userId) });
		else console.error("User ID is null or undefined");
	}
	if (sessionData?.user) {
		if (!getSubmissions.isLoading)
			return (
				<>
					{getSubmissions?.data ? (
						<div className="m-auto w-fit">
							<h1 className="mt-20 text-center text-2xl">
								All Submissions
							</h1>
							<h1 className="text-extrabold mt-10">Round 1</h1>
							<table className="border">
								<th className="border p-3">UserID</th>
								<th className="border p-3">Name</th>
								<th className="border p-3">Points</th>
								<th className="border p-3">Submited at</th>
								{getSubmissions?.data?.roundOneSorted.map(
									(element, key) => {
										return (
											<tr key={key}>
												<td className="border p-5">
													{element.id}
												</td>
												<td className="border p-5">
													{element.name}
												</td>
												<td className="border p-5">
													{element.points1}
												</td>
												<td className="border p-5">
													{element.roundOne?.createdAt.toDateString()}
												</td>
												<td
													data-userid={element.id}
													className="border p-5"
												>
													<button
														className="rounded border bg-black p-3 text-white"
														data-userid={element.id}
														onClick={(e) =>
															handleclick(e)
														}
													>
														Reduce score by 10
													</button>
												</td>
											</tr>
										);
									}
								)}
							</table>
							<h1 className="text-extrabold mt-10">Round 2</h1>
							<table>
								<th className="border p-3">UserID</th>
								<th className="border p-3">Name</th>
								<th className="border p-3">Points</th>
								<th className="border p-3">Submited at</th>
								{getSubmissions?.data?.roundTwoSorted.map(
									(element, key) => {
										return (
											element.roundTwo && (
												<tr key={key}>
													<td className="border p-5">
														{element.id}
													</td>
													<td className="border p-5">
														{element.name}
													</td>
													<td className="border p-5">
														{element.points1}
													</td>
													<td className="border p-5">
														{element.roundTwo?.createdAt.toDateString()}
													</td>
													<td
														data-userid={element.id}
														className="border p-5"
													>
														<button
															className="rounded border bg-black p-3 text-white"
															data-userid={
																element.id
															}
															onClick={(e) =>
																handleclick(e)
															}
														>
															Reduce score by 10
														</button>
													</td>
												</tr>
											)
										);
									}
								)}
							</table>
						</div>
					) : (
						<h2>{getSubmissions.error?.message}</h2>
					)}
				</>
			);
		return "Loading...";
	}
}
