import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req:NextApiRequest, res:NextApiResponse) {
    //if password matches redirect to mailbox
    const {password}=req.body as {password:string}
    if(password &&password==="cynthia")
        res.redirect(301,'/gsh77s8') 
    else 
        res.redirect(301,"/login2093?user=guest&error=wrongpassword");
}