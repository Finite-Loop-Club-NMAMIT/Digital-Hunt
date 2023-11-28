import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import ImageSlider from "~/components/imageslider";
import { api } from "~/utils/api";

// export default function DownloadZip() {
// 	const getFile = api.files.getFile.useQuery();
//     const { status: status,data } = useSession();
//     const router = useRouter();
  
//     if (status === "unauthenticated") {
//       router.push("/", undefined).catch((e) => console.log(e));
//     }
//     if (status === "loading") {
//       return <></>;
//     }
    
//     if(getFile.data!==undefined && typeof getFile.data !== "string" && getFile.data.error){
//         return <div>{getFile.data.error.message}</div>
//     }
// 	else if (!getFile.error && getFile.data && typeof getFile.data === "string") {
// 		void router.push(getFile.data.toString());
// 	}
// }

const images = ["15.png", "16.png", "17.png", "18.png", "19.png", "20.png", "21.png", "22.png"];

export default function DownloadZip() {
	const getFile = api.files.getFile.useQuery();
    const { status: status,data } = useSession();
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
          <div className="bg-black min-h-screen flex flex-col items-center text-white px-3 py-4">
            <h1 className="text-lg font-semibold px-2">Congratulations!! on clearing Round1</h1>
            <h1 className="text-3xl font-semibold neonText px-2">Round 2 Storyline</h1>
            <ImageSlider propsImages={images}/>
          </div>
        </>
      );
	}
}
