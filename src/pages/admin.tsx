import { useSession } from "next-auth/react";
import { z } from "zod";
import { api } from "~/utils/api";

export default function Instagram() {
    const { data: sessionData } = useSession();
    const reduceScoreRound1 = api.admin.reduceScoreRound1.useMutation()
    const reduceScoreRound2 = api.admin.reduceScoreRound2.useMutation()
    const {data:getSubmissions,refetch} = api.admin.getSubmissions.useQuery()
    // function handleclick(e: Event) {
    function decrementRound1(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        // reduceScore.mutate({ userid: z.string().parse(e.target.dataset.userid) })
        const userId = (e.target as HTMLElement)?.dataset?.userid;
        if (userId) 
            reduceScoreRound1.mutate({ userid: z.string().parse(userId) },{
                onSuccess: () => {
                    refetch().catch(console.error);
                },
                onError: (error) => {
                    console.error(error);
                    alert('Error reducing score');
                }
            });
        else
            console.error('User ID is null or undefined');
    }
    function decrementRound2(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        // reduceScore.mutate({ userid: z.string().parse(e.target.dataset.userid) })
        const userId = (e.target as HTMLElement)?.dataset?.userid;
        if (userId) 
            reduceScoreRound2.mutate({ userid: z.string().parse(userId) },{
                onSuccess: () => {
                    refetch().catch(console.error);
                },
                onError: (error) => {
                    console.error(error);
                    alert('Error reducing score');
                }
            });
        else
            console.error('User ID is null or undefined');
    }
    if (sessionData?.user) {
        return (
            <>
            <h1 className="text-center text-2xl mt-20">All Submissions</h1>
                <div className="w-fit m-auto">
                    <h1 className="text-extrabold mt-10">Round 1</h1>
                    <table className="border">
                        <thead>
                            <th className="p-3 border">UserID</th>
                            <th className="p-3 border">Name</th>
                            <th className="p-3 border">Total Points</th>
                            <th className="p-3 border">Points</th>
                            <th className="p-3 border">Negative Points</th>
                            <th className="p-3 border">Submited at</th>
                        </thead>
                        <tbody>
                        {getSubmissions?.roundOneSorted.map((element, key) => {
                            return (
                                <tr key={key}>
                                    <td className="border p-5">{element.id}</td>
                                    <td className="border p-5">{element.name}</td>
                                    <td className="border p-5">{element.points1+element.minusPoints1}</td>
                                    <td className="border p-5">{element.points1}</td>
                                    <td className="border p-5">{element.minusPoints1}</td>
                                    <td className="border p-5">{element.roundOne?.updatedAt.toUTCString()}</td>
                                    <td data-userid={element.id} className="border p-5"><button className="border rounded p-3 bg-black text-white" data-userid={element.id} onClick={(e) => decrementRound1(e)}>Reduce score by 10</button></td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                    <h1 className="text-extrabold mt-10">Round 2</h1>
                    <table>
                        <thead>
                            <th className="p-3 border">UserID</th>
                            <th className="p-3 border">Name</th>
                            <th className="p-3 border">Total Points</th>
                            <th className="p-3 border">Points</th>
                            <th className="p-3 border">Negative Points</th>
                            <th className="p-3 border">Submited at</th>
                        </thead>
                        <tbody>
                        {getSubmissions?.roundTwoSorted.map((element, key) => {
                            return element.roundTwo && (
                                <tr key={key}>
                                    <td className="border p-5">{element.id}</td>
                                    <td className="border p-5">{element.name}</td>
                                    <td className="border p-5">{element.points2+element.minusPoints2}</td>
                                    <td className="border p-5">{element.points2}</td>
                                    <td className="border p-5">{element.minusPoints2}</td>
                                    <td className="border p-5">{element.roundTwo?.updatedAt.toUTCString()}</td>
                                    <td data-userid={element.id} className="border p-5"><button className="border rounded p-3 bg-black text-white" data-userid={element.id} onClick={(e) => decrementRound2(e)}>Reduce score by 10</button></td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                    </div>
            </>
        )
    }
}
