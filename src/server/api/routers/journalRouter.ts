import { Router } from "@trpc/server";
import { string, z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';
import { prisma } from '../../db';
import { v4 as uuidv4 } from 'uuid';



export const createJournalRouter = createTRPCRouter({
    createPost: protectedProcedure.input(z.object({journalText: z.string(), journalTitle: z.string()}))
    .mutation(async ({ input, ctx }) => {
        const journalEntry = await ctx.prisma.journalEntry.create({
            data: {
                id: uuidv4(),
                title: input.journalTitle,
                content: input.journalText,
                userId: ctx.session.user.id,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
    });
      return journalEntry
    }),

    deletePost: protectedProcedure.input(z.object({id: z.string()})).mutation(async ({ input, ctx }) => {
        const journalEntry = await ctx.prisma.journalEntry.delete({
            where: {
                id: input.id
            }
        });
        return journalEntry
    }
    ),

    getAllUsersEntries: protectedProcedure.query(async({ctx})=>{
        return ctx.prisma.journalEntry.findMany({where: {userId: ctx.session.user.id}});
    })
});