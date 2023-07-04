import { Router } from '@trpc/server'
import { string, z } from 'zod'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'
import { prisma } from '../../db'
import { v4 as uuidv4 } from 'uuid'

export const createJournalRouter = createTRPCRouter({
	createJournal: protectedProcedure
		.input(z.object({ journalText: z.string(), journalTitle: z.string() }))
		.mutation(async ({ input, ctx }) => {
			const journalEntry = await ctx.prisma.journalEntry.create({
				data: {
					id: uuidv4(),
					title: input.journalTitle,
					content: input.journalText,
					userId: ctx.session.user.id,
				},
			})
			return journalEntry
		}),

	deletePost: protectedProcedure
		.input(z.object({ id: z.string() }))
		.mutation(async ({ input, ctx }) => {
			const journalEntry = await ctx.prisma.journalEntry.delete({
				where: {
					id: input.id,
				},
			})
			return journalEntry
		}),

	getAllUsersEntries: protectedProcedure.query(async ({ ctx }) => {
		return ctx.prisma.journalEntry.findMany({
			where: { userId: ctx.session.user.id },
		})
	}),

	getSpecificEntry: protectedProcedure
		.input(z.object({ id: z.string() }))
		.query(async ({ input, ctx }) => {
			return ctx.prisma.journalEntry.findUnique({
				where: { id: input.id },
			})
		}),
	editSpecificEntry: protectedProcedure
		.input(z.object({ id: z.string(), journalText: z.string(), journalTitle: z.string() }))
		.mutation(async ({ input, ctx }) => {
			const journalEntry = await ctx.prisma.journalEntry.update({
				where: {
					id: input.id,
				},
				data: {
					title: input.journalTitle,
					content: input.journalText,
				},
			})
			return journalEntry
		})
})
