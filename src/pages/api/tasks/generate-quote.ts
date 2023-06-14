import { prisma } from "~/server/db";
import { openaiClient } from "~/utils/openai";
import getFormattedDate from "~/utils/date";
import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prompt =
    "Please provide a meaningful quote followed by a less than a paragraph of reflection. i dont want you to reflect i want something i can reflect on throughout my day, like the daily quote app, but something that will give me something genuine to approach and think about. im making an app where people get quotes like this and can write journals about them during their day, make the quote fit the theme of said app";
  try {
    if (
      await prisma.dailyQuote.findFirst({
        where: { creationDate: getFormattedDate },
      })
    ) {
      return res
        .status(400)
        .json({ error: "Quote already generated for today" });
    } else {
      const response = await openaiClient.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 150,
      });
      if (response.data.choices[0]?.message?.content) {
        const quote = response.data.choices[0].message.content;
        await prisma.dailyQuote.create({
          data: {
            id: uuidv4(),
            quote: quote,
            creationDate: getFormattedDate,
          },
        });
        return res.status(200).json({ quote });
      }
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Internal server error" });
  }
}
