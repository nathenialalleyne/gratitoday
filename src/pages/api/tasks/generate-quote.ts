import { prisma } from '~/server/db'
import { openaiClient } from '~/utils/openai'
import getFormattedDate from '~/utils/date'
import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuidv4 } from 'uuid'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const prompt =
		"Give me a passage written by you or taken from somewhere OR a quote from someone (make it 50/50 whichever you choose to give) to  reflect on throughout the day, that can be a quote or a passage you think of, anything that works, to be clear it doesn't have to be a quote, i prefer that you mix it up"
	try {
		if (
			await prisma.dailyQuote.findFirst({
				where: { creationDate: getFormattedDate },
			})
		) {
			return res
				.status(400)
				.json({ error: 'Quote already generated for today' })
		} else {
			const response = await openaiClient.createChatCompletion({
				model: 'gpt-3.5-turbo',
				messages: [{ role: 'user', content: prompt }],
				max_tokens: 150,
			})
			if (response.data.choices[0]?.message?.content) {
				const quote = response.data.choices[0].message.content
				await prisma.dailyQuote.create({
					data: {
						id: uuidv4(),
						quote: quote,
						creationDate: getFormattedDate,
					},
				})
				return res.status(200).json({ quote })
			}
		}
	} catch (e) {
		console.error(e)
		return res.status(500).json({ error: 'Internal server error' })
	}
}
