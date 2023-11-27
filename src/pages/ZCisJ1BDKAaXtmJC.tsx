import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

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
		void router.push(getFile.data.toString());
	}
}
