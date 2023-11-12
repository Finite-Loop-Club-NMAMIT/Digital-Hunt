import Link from "next/link";
import { api } from "~/utils/api";
import { UserCircle2Icon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function MailBox() {
  const { data: mails } = api.mailBoxRouter.getAllMails.useQuery();

  const { status: status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("/", undefined).catch((e) => console.log(e));
  }
  if (status === "loading") {
    return <></>;
  }
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className="mb-4 mt-3 text-center text-xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-xl lg:text-2xl">
          Mailbox
        </h1>
        <div className="h-fit w-[50%] rounded-lg border-2 px-3 py-2">
          <ul className="w-full divide-y divide-gray-200 dark:divide-gray-700">
            {mails?.map((mail, key) => (
              <li key={key} className="py-3 sm:py-4">
                <Link href={mail.publicUrl ? mail.publicUrl : "/"}>
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <UserCircle2Icon size={40} className="text-[#10b981]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-blue-900 dark:text-white">
                        {mail.name}
                      </p>
                      <p className="truncate text-xs font-medium text-gray-900 dark:text-white">
                        Subject: {mail.subject}
                      </p>
                      <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                        {mail.body}
                      </p>
                    </div>
                    <div className="inline-flex items-center text-sm font-semibold text-gray-600 dark:text-white">
                      {/* {Math.floor(Math.random() * 12)}:{Math.floor(Math.random() * 60)} AM */}
                      {Math.floor(Math.random() * (18 - 8 + 1))}:
                      {String(Math.floor(Math.random() * 60)).padStart(2, "0")}{" "}
                      {Math.random() < 0.5 ? "AM" : "PM"}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
