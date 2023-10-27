import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req:NextApiRequest, res:NextApiResponse) {
    //if password matches redirect to mailbox
    const {password}=req.body as {password:string}
    if(password==="cynthia")
        res.redirect('/gsh77s8') 
    else 
        res.redirect("/login2093?user=guest&error=wrongpassword");
}