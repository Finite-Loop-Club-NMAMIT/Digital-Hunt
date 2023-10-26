import type { MailBox } from '@prisma/client';
import { publicProcedure,createTRPCRouter} from '../trpc';

export const mailBoxRouter = createTRPCRouter({
  getAllMails: publicProcedure.query(async ({ctx,input})=>{
    const p=await ctx.db.mailBox.findMany()
    if(p===undefined)
        throw new Error("no such mailbox")
    return p
  })
});