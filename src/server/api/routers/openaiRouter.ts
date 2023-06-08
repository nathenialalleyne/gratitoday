import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { openaiClient } from "~/utils/openai";
import generateQuote from "../tasks/generate-quote";
import getFormattedDate from "~/utils/date";
import { prisma } from "~/server/db";
import { TRPCError } from "@trpc/server";

const getModels = async () => {
  const models = await openaiClient.listModels();
  return models;
};

export const getOpenAI = createTRPCRouter({
  listModels: publicProcedure.query(async () => {
    return (await getModels()).data;
  }),
  createCompletion: publicProcedure.query(async () => {
    try {
      try {
        await generateQuote();
      } catch (e: any) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: e.message,
        });
      }
      return prisma.dailyQuote.findFirst({
        where: { creationDate: getFormattedDate },
      });
    } catch (e) {
      if (e instanceof Error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: e.message,
        });
      }
    }
  }),
  listCompletions: protectedProcedure.query(async () => {
    return prisma.dailyQuote.findMany();
  }),
});
