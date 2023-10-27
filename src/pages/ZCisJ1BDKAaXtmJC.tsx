import { useRouter } from "next/router";
import { api } from "~/utils/api";

export default function DownloadZip() {
	const getFile = api.files.getFile.useQuery();
	const router = useRouter();
	if (!getFile.error && getFile.data) {
		void router.push(getFile.data.toString());
	}
}
