import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { openaiClient } from "~/utils/openai";
import getFormattedDate from "~/utils/date";
import { prisma } from "~/server/db";
import { TRPCError } from "@trpc/server";

const getModels = async () => {
  const models = await openaiClient.listModels();
  return models;
};

export const getOpenAI = createTRPCRouter({
  getDailyQuote: protectedProcedure.query(async () => {
    return prisma.dailyQuote.findMany();
  }),
  getTodaysQuote: publicProcedure.query(async () => {
    return prisma.dailyQuote.findFirst({
      where: { creationDate: getFormattedDate },
    });
  }),
});
