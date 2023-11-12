import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { z } from "zod";
import { api } from "~/utils/api";

export default function Admin() {
  const { data: sessionData ,status: status } = useSession();
  const reduceScoreRound1 = api.admin.reduceScoreRound1.useMutation();
  const reduceScoreRound2 = api.admin.reduceScoreRound2.useMutation();

  const [showMembers1, setShowMembers1] = useState(10);
  const [showMembers2, setShowMembers2] = useState(10);
  const { data: getSubmissions, refetch } = api.admin.getSubmissions.useQuery();
  // function handleclick(e: Event) {
  function decrementRound1(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    // reduceScore.mutate({ userid: z.string().parse(e.target.dataset.userid) })
    const userId = (e.target as HTMLElement)?.dataset?.userid;
    if (userId)
      reduceScoreRound1.mutate(
        { userid: z.string().parse(userId) },
        {
          onSuccess: () => {
            refetch().catch(console.error);
          },
          onError: (error) => {
            console.error(error);
            alert("Error reducing score");
          },
        },
      );
    else console.error("User ID is null or undefined");
  }
  function decrementRound2(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    // reduceScore.mutate({ userid: z.string().parse(e.target.dataset.userid) })
    const userId = (e.target as HTMLElement)?.dataset?.userid;
    if (userId)
      reduceScoreRound2.mutate(
        { userid: z.string().parse(userId) },
        {
          onSuccess: () => {
            refetch().catch(console.error);
          },
          onError: (error) => {
            console.error(error);
            alert("Error reducing score");
          },
        },
      );
    else console.error("User ID is null or undefined");
  }
  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("/", undefined).catch((e) => console.log(e));
  }
  if (status === "loading") {
    return <></>;
  }
  if (sessionData?.user) {
    return (
      <>
        <h1 className="mt-20 text-center text-2xl">All Submissions</h1>
        <div className="m-auto w-fit">
          <h1 className="text-extrabold mt-10 text-3xl">Round 1</h1>
          <table className="border">
            <thead>
              <tr>
                <th className="border p-3">Name</th>
                <th className="border p-3">Total Points</th>
                <th className="border p-3">Points</th>
                <th className="border p-3">Negative Points</th>
                <th className="border p-3">Submited at</th>
              </tr>
            </thead>
            <tbody>
              {getSubmissions?.roundOneSorted
                .slice(0, showMembers1)
                .map((element, key) => {
                  return (
                    <tr key={key}>
                      <td className="border p-5">{element.name}</td>
                      <td className="border p-5">
                        {element.points1 + element.minusPoints1}
                      </td>
                      <td className="border p-5">{element.points1}</td>
                      <td className="border p-5">{element.minusPoints1}</td>
                      <td className="border p-5">
                        {element.roundOne?.updatedAt.toUTCString()}
                      </td>
                      <td data-userid={element.id} className="border p-5">
                        <button
                          className="rounded border bg-black p-3 text-white"
                          data-userid={element.id}
                          onClick={(e) => decrementRound1(e)}
                        >
                          Reduce score by 10
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          {getSubmissions?.roundTwoSorted.length &&
            showMembers2 < getSubmissions?.roundTwoSorted.length && (
              <button
                className="m-auto block rounded border bg-black p-3 text-white"
                onClick={(e) => setShowMembers1((p) => p + 10)}
              >
                Load More
              </button>
            )}
          <h1 className="text-extrabold mt-10 text-3xl">Round 2</h1>
          <table>
            <thead>
              <tr>
                <th className="border p-3">Name</th>
                <th className="border p-3">Total Points</th>
                <th className="border p-3">Points</th>
                <th className="border p-3">Negative Points</th>
                <th className="border p-3">Submited at</th>
              </tr>
            </thead>
            <tbody>
              {getSubmissions?.roundTwoSorted
                .slice(0, showMembers2)
                .map((element, key) => {
                  return (
                    element.roundTwo && (
                      <tr key={key}>
                        <td className="border p-5">{element.name}</td>
                        <td className="border p-5">
                          {element.points2 + element.minusPoints2}
                        </td>
                        <td className="border p-5">{element.points2}</td>
                        <td className="border p-5">{element.minusPoints2}</td>
                        <td className="border p-5">
                          {element.roundTwo?.updatedAt.toUTCString()}
                        </td>
                        <td data-userid={element.id} className="border p-5">
                          <button
                            className="rounded border bg-black p-3 text-white"
                            data-userid={element.id}
                            onClick={(e) => decrementRound2(e)}
                          >
                            Reduce score by 10
                          </button>
                        </td>
                      </tr>
                    )
                  );
                })}
            </tbody>
          </table>
          {getSubmissions?.roundTwoSorted.length &&
            showMembers2 < getSubmissions?.roundTwoSorted.length && (
              <button
                className="m-auto block rounded border bg-black p-3 text-white"
                onClick={(e) => setShowMembers2((p) => p + 10)}
              >
                Load More
              </button>
            )}
        </div>
      </>
    );
  }
}