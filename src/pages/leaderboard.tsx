import { api } from "~/utils/api";

const Leaderboard = () => {
  const { data, refetch, isRefetching, isLoading } =
    api.leaderboardRouter.getSubmissions.useQuery();

  return (
    <div className="p-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">🏆 Leaderboard</h1>
          <p className="text-sm font-thin italic text-gray-600">
            You need to submit the form atleast once to appear on Leaderboard
          </p>
        </div>
        <div>
          <button
            className="flex items-center gap-2 rounded-xl bg-gray-200 px-2 py-1 hover:bg-gray-300"
            onClick={() => refetch()}
          >
            <svg
              width="18px"
              height="18px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 12C21 16.9706 16.9706 21 12 21C9.69494 21 7.59227 20.1334 6 18.7083L3 16M3 12C3 7.02944 7.02944 3 12 3C14.3051 3 16.4077 3.86656 18 5.29168L21 8M3 21V16M3 16H8M21 3V8M21 8H16"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            {isRefetching ? "Loading..." : "Refresh"}
          </button>
        </div>
      </div>

      <table className="mt-5 w-full text-left text-sm text-gray-500">
        <thead className="bg-gray-50 text-sm uppercase text-gray-700">
          <tr>
            <th scope="col" className="border px-6 py-3">
              Name
            </th>
            <th scope="col" className="border px-6 py-3">
              Points Gained
            </th>
            <th scope="col" className="border px-6 py-3">
              Points Lost
            </th>
            <th scope="col" className="border px-6 py-3">
              Total Points
            </th>
            <th scope="col" className="border px-6 py-3">
              Round
            </th>
          </tr>
        </thead>
        {isLoading && (
          <tbody>
            <tr>
              <td
                colSpan={5}
                className="px-6 py-4 text-center text-black flex items-center gap-2"
              >
                <svg
                  aria-hidden="true"
                  className="h-4 w-4 animate-spin fill-black text-gray-200 dark:text-gray-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                Loading...
              </td>
            </tr>
          </tbody>
        )}
        <tbody>
          {data?.map((submission) => (
            <tr key={submission.id} className="bg-white">
              <td className="border px-6 py-4 text-black">{submission.name}</td>
              <td className="border px-6 py-4">{submission.pointsGained}</td>
              <td className="border px-6 py-4">{submission.pointsLost}</td>
              <td className="border px-6 py-4">{submission.totalPoints}</td>
              <td className="flex items-center gap-2 border px-6 py-4">
                {submission.roundTwo ||
                  (submission.roundOne && (
                    <svg
                      width="20px"
                      height="20px"
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="tick">
                        <g id="tick_2">
                          <path
                            id="Combined Shape"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M43.8679 21.6919C44.6935 28.8058 41.6741 35.704 36.0728 39.952C35.6328 40.2857 35.0055 40.1995 34.6718 39.7595C34.338 39.3194 34.4242 38.6921 34.8643 38.3584C39.9074 34.5338 42.6244 28.3263 41.8812 21.9225C41.671 20.1113 41.1986 18.3944 40.5065 16.8051L26.1673 31.1443C25.5822 31.7294 24.7948 32.0363 23.9994 32.0271C23.1815 32.0363 22.3941 31.7294 21.809 31.1443L14.359 23.6943C13.9685 23.3038 13.9685 22.6706 14.359 22.2801C14.7496 21.8896 15.3827 21.8896 15.7733 22.2801L23.2233 29.7301C23.4197 29.9265 23.6865 30.0305 23.9994 30.0273C24.2898 30.0305 24.5566 29.9265 24.753 29.7301L39.5542 14.9289C36.0589 8.94407 29.2496 5.2706 21.924 6.12251C12.0492 7.27066 4.97548 16.2058 6.12186 26.0817C7.06163 34.1648 13.2925 40.5543 21.232 41.7937C21.4211 41.8262 21.7587 41.8766 22.187 41.9273C22.5257 41.9674 22.8658 42.0003 23.1985 42.0236C23.7495 42.0623 24.1647 42.5402 24.1261 43.0912C24.0875 43.6421 23.6095 44.0574 23.0586 44.0187C22.6921 43.993 22.3207 43.9571 21.9519 43.9134C21.4857 43.8582 21.1145 43.8028 20.9083 43.7672C12.1017 42.3926 5.17946 35.2942 4.13522 26.3125C2.86149 15.3394 10.7211 5.4116 21.693 4.13589C29.6475 3.21084 37.0542 7.08801 41.0117 13.4715L42.279 12.2041C42.6696 11.8136 43.3027 11.8136 43.6933 12.2041C44.0838 12.5946 44.0838 13.2278 43.6933 13.6183L42.0149 15.2967C42.9621 17.2572 43.6027 19.4071 43.8679 21.6919Z"
                            fill="#000000"
                          />
                        </g>
                      </g>
                    </svg>
                  ))}
                {submission.roundTwo
                  ? "Round 2 cleared"
                  : submission.roundOne
                    ? "Round 1 cleared"
                    : "In Round 1"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
