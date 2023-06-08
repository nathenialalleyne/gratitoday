import { prisma } from "~/server/db";
import { openaiClient } from "~/utils/openai";
import { generateID } from "~/utils/idGenerator";
import getFormattedDate from "~/utils/date";

export default async function generateQuote() {
  const prompt =
    "Please provide a meaningful quote followed by a less than a paragraph of reflection. i dont want you to reflect i want something i can reflect on throughout my day, like the daily quote app, but something that will give me something genuine to approach and think about. im making an app where people get quotes like this and can write journals about them during their day, make the quote fit the theme of said app";
  try {
    if (
      !(await prisma.dailyQuote.findFirst({
        where: { creationDate: getFormattedDate },
      }))
    ) {
      const response = await openaiClient.createCompletion({
        model: "babbage",
        prompt: prompt,
        max_tokens: 150,
      });
      if (response.data.choices[0]?.text) {
        prisma.dailyQuote.create({
          data: {
            id: generateID(),
            quote: response.data.choices[0]?.text,
            creationDate: getFormattedDate,
          },
        });
      }
    }
  } catch (e) {
    console.error(e);
  }
}
