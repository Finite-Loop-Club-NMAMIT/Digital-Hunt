import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

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
	if (!getFile.error && getFile.data) {
		void router.push(getFile.data.toString());
	}
}
