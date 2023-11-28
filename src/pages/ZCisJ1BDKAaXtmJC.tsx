import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import ImageSlider from "~/components/imageslider";
import { api } from "~/utils/api";

const images = ["15.png", "16.png", "17.png", "18.png", "19.png", "20.png", "21.png", "22.png"];

export default function DownloadZip() {
	const getFile = api.files.getFile.useQuery();
    const { status: status } = useSession();
    const router = useRouter();
  
    if (status === "unauthenticated") {
      router.push("/", undefined).catch((e) => console.log(e));
    }
    if (status === "loading") {
      return <></>;
    }
    
    if(getFile.data!==undefined && typeof getFile.data !== "string" && getFile.data.error){
        return <div>{getFile.data.error.message}</div>
    }
	else if (!getFile.error && getFile.data && typeof getFile.data === "string") {
      return (
        <>
          <div className="bg-black min-h-screen flex flex-col items-center text-center text-white px-3 py-4">
            <h1 className="text-lg font-semibold px-2">Congratulations!! on clearing Round1</h1>
            <h1 className="text-3xl font-semibold neonText px-2 mb-3">Round 2 Storyline</h1>
            <ImageSlider propsImages={images} />
            <div className="mt-6 border border-green-400 flex flex-wrap gap-5 items-center justify-center p-3">
              <Link className="flex-2 h-full text-white font-normal text-md bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br ring-green-900 ring-4 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-800/80 rounded-lg px-5 py-2.5 text-center"
                  href={getFile.data.toString()} rel="noopener noreferrer" target="_blank">
                  Download zip 📦
              </Link>
              <a className="flex-2 h-full text-white font-normal text-md bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br ring-green-900 ring-4 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-800/80 rounded-lg px-5 py-2.5 text-center"
                  href="/bookmarks.txt" download="bookmarks.txt" rel="noopener noreferrer">
                  Download bookmarks 📑
              </a>
              <Link className="flex-2 h-full text-white font-normal text-md bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br ring-green-900 ring-4 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-800/80 rounded-lg px-5 py-2.5 text-center"
                  href={"/round2"} rel="noopener noreferrer" target="_blank">
                  Round 2 Submission
              </Link>
            </div>
          </div>
        </>
      );
	}
}
