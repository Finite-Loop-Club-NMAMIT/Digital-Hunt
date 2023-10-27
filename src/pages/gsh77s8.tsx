import Link from "next/link"
import { api } from "~/utils/api"

export default function MailBox(){
    const {data:mails}=api.mailBoxRouter.getAllMails.useQuery()
    return (
        <>
            <div className="flex flex-col justify-center items-center">
                <h1 className='mt-3 mb-4 text-xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-xl lg:text-2xl dark:text-white'>Mailbox</h1>
                <div className="w-[50%] h-fit px-3 py-2 border-2 rounded-lg">
                    <ul className="w-full divide-y divide-gray-200 dark:divide-gray-700">
                        { 
                            mails?.map((mail, key) =>
                                <li key={key} className="py-3 sm:py-4">
                                    <Link  href={mail.publicUrl?mail.publicUrl:"/"}>
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-shrink-0">
                                                <img className="w-10 h-10 rounded-full" src="https://res.cloudinary.com/dg7etzwks/image/upload/v1689588259/extras/userIcon_dhf5ym.png" alt="user image" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-blue-900 truncate dark:text-white">
                                                    {mail.name}
                                                </p>
                                                <p className="text-xs font-medium text-gray-900 truncate dark:text-white">
                                                    Subject: {mail.subject}
                                                </p>
                                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                    {mail.body}
                                                </p>
                                            </div>
                                            <div className="inline-flex items-center text-sm font-semibold text-gray-600 dark:text-white">
                                                {Math.floor(Math.random() * 12)}:{Math.floor(Math.random() * 60)} AM
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}