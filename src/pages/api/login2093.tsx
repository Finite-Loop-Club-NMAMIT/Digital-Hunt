import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req:NextApiRequest, res:NextApiResponse) {
    //if password matches redirect to mailbox

    res.redirect('/gsh77s8') 

    //else error message to login page
    res.redirect('/login2093?error=Wrong Password');
}