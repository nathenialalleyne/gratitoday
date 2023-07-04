import bcrypt from 'bcrypt'

export async function encrypt(password: string) {
	const saltRound = 10
	const hashedPassword = bcrypt.hash(password, saltRound, (err, hash) => {
		if (err) {
			console.error(err)
		}
		return hash
	})

	return hashedPassword
}

export async function compare(password: string, hashedPassword: string) {
	const match = await bcrypt.compare(password, hashedPassword)
	return match
}
