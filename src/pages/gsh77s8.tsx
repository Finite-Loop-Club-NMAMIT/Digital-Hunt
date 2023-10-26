import Link from "next/link"
import { api } from "~/utils/api"

export default function MailBox(){
    const {data:mails}=api.mailBoxRouter.getAllMails.useQuery()
    return(
        <div>
            <h2>Mailbox</h2>

            {
                mails?.map((mail,key)=>
                <Link key={key} href={mail.publicUrl?mail.publicUrl:"/"}>
                    <div className="grid grid-cols-3">
                        <h3 className="grid">{mail.name}</h3>
                        <h3>{mail.subject}</h3>
                        <p>{mail.body}</p>
                    </div>
                </Link>

                )
            }
        </div>
    )
}