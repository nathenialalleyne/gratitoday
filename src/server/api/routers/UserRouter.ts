import { string, z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { prisma } from "../../db";
import { getSession } from "next-auth/react";
import { IncomingMessage } from "http";
import { v4 as uuidv4 } from "uuid";

export const createUserRouter = createTRPCRouter({
  createAccount: protectedProcedure.mutation(async ({ ctx }) => {
    const account = await ctx.prisma.account.create({
      data: {
        id: uuidv4(),
        userId: ctx.session.user.id,
        type: "base_user",
        provider: "discord",
        providerAccountId: "discord_1",
      },
    });
    return account;
  }),

  getAllUsers: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.user.findMany();
  }),
});
