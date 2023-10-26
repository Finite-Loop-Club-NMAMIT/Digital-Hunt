import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { z } from "zod";
import { api } from "~/utils/api";

export default function Instagram() {
    const { data: sessionData, status: status } = useSession();
    const router = useRouter();
    const reduceScore = api.admin.reduceScore.useMutation()
    const getSubmissions = api.admin.getSubmissions.useQuery().data
    function handleclick(e: Event) {
        reduceScore.mutate({ userid: z.string().parse(e.target.dataset.userid) })
    }
    if (sessionData?.user) {
        return (
            <>
            <h1 className="text-center text-2xl mt-20">All Submissions</h1>
                <div className="w-fit m-auto">
                    <h1 className="text-extrabold mt-10">Round 1</h1>
                    <table className="border">
                        <th className="p-3 border">UserID</th>
                        <th className="p-3 border">Name</th>
                        <th className="p-3 border">Points</th>
                        <th className="p-3 border">Submited at</th>
                        {getSubmissions?.roundOneSorted.map((element, key) => {
                            return (
                                <tr key={key}>
                                    <td className="border p-5">{element.id}</td>
                                    <td className="border p-5">{element.name}</td>
                                    <td className="border p-5">{element.points}</td>
                                    <td className="border p-5">{element.roundOne?.createdAt.toDateString()}</td>
                                    <td data-userid={element.id} className="border p-5"><button className="border rounded p-3 bg-black text-white" data-userid={element.id} onClick={(e) => handleclick(e)}>Reduce score by 10</button></td>
                                </tr>
                            )
                        })}
                    </table>
                    <h1 className="text-extrabold mt-10">Round 2</h1>
                    <table>
                        <th className="p-3 border">UserID</th>
                        <th className="p-3 border">Name</th>
                        <th className="p-3 border">Points</th>
                        <th className="p-3 border">Submited at</th>
                        {getSubmissions?.roundTwoSorted.map((element, key) => {
                            return element.roundTwo && (
                                <tr key={key}>
                                    <td className="border p-5">{element.id}</td>
                                    <td className="border p-5">{element.name}</td>
                                    <td className="border p-5">{element.points}</td>
                                    <td className="border p-5">{element.roundTwo?.createdAt.toDateString()}</td>
                                    <td data-userid={element.id} className="border p-5"><button className="border rounded p-3 bg-black text-white" data-userid={element.id} onClick={(e) => handleclick(e)}>Reduce score by 10</button></td>
                                </tr>
                            )
                        })}
                    </table>
                    </div>
            </>
        )
    }
}
