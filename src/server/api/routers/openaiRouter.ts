import { Router } from "@trpc/server";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { openaiClient } from "~/utils/openai";

const getModels = async () => {
  const models = await openaiClient.listModels();
  return models;
};

const createCompletion = async () => {
  const completion = await openaiClient.createCompletion({
    model: "text-babbage-001",
    prompt: "type the alphabet for me",
    temperature: 1,
  });
  return completion;
};

export const getOpenAI = createTRPCRouter({
  listModels: publicProcedure.query(async () => {
    return (await getModels()).data;
  }),
  createCompletion: publicProcedure.query(async () => {
    return (await createCompletion()).data;
  }),
});
