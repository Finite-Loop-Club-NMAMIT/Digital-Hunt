import { env } from '~/env.mjs';
import { publicProcedure,createTRPCRouter} from '../trpc';
import {createTransport} from 'nodemailer'
import type {MailOptions} from 'nodemailer/lib/json-transport';
import {Amazon,Bitcoin,mailConfig,CodeDigit} from '~/utils/mail'



export const mailBoxRouter = createTRPCRouter({
  getAllMails: publicProcedure.query(async ({ctx})=>{
    const p=await ctx.db.mailBox.findMany()

    if(p===undefined)
        throw new Error("no such mailbox")

    if(p[0]?.updatedAt instanceof Date){
        const diff = (new Date().getTime() - (p[0]?.updatedAt).getTime()) / (1000*60*60);
        if (diff <=5) {
            return p
        }
    }
    try{
        await sendMail(Amazon).then(async (res)=>{
            await ctx.db.mailBox.updateMany({where:{name:"Amazon"},data:{
                publicUrl:"https://ethereal.email/message/"+res,
            }})
        })
        await sendMail(Bitcoin).then(async (res)=>{
            await ctx.db.mailBox.updateMany({where:{name:"Bitcoin"},data:{
                publicUrl:"https://ethereal.email/message/"+res,
            }})
        })
        await sendMail(CodeDigit).then(async (res)=>{
            await ctx.db.mailBox.updateMany({where:{name:"CodeDigit"},data:{
                publicUrl:"https://ethereal.email/message/"+res,
            }})
        })
    }
    catch(e){
        throw new Error("Error sending mail")
    }

    const pN=await ctx.db.mailBox.findMany()
    return pN
  })
});


const sendMail=async (mail:MailOptions)=>{

    const transporter = createTransport(mailConfig);
    const response=await transporter.sendMail(mail).catch((err)=>{throw new Error("Error sending mail")})
    let str:string=response.response.split("MSGID=")[1]??""
    if(!str)
        throw new Error("Error sending mail")
    str=str.replace("]","")
    return str
}