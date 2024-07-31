import { z } from "zod"

import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
} from "firebase/auth"
import { app } from "./firebase"

export const loginFormSchema = z.object({
	email: z
		.string()
		.min(
			1,
			"Введите имя пользователя или адрес электронной почты из аккаунта Spotify."
		)
		.email(
			"Адрес электронной почты недействителен. Убедитесь, что он указан в таком формате: example@email.com."
		),
	password: z.string().min(1, "Введите пароль"),
})

export const registerInputSchema = z.object({
	email: z
		.string()
		.email(
			"Адрес электронной почты недействителен. Убедитесь, что он указан в таком формате: example@email.com."
		),
	password: z.string().superRefine((password, ctx) => {
		const errorsMassages = []

		if (password.length < 10) {
			errorsMassages.push("10 символов")
		}

		const numRegx = /(?=.*[0-9#!?&])/

		if (!numRegx.test(password)) {
			errorsMassages.push("1 цифру или специальный символ (например, # ? ! &)")
		}

		const letterRegx = /(?=.*[a-zA-Z]).*/

		if (!letterRegx.test(password)) {
			errorsMassages.push("1 букву")
		}

		if (errorsMassages.length) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: errorsMassages.join("~"),
				path: [""],
			})
		}
	}),
	username: z
		.string()
		.min(1, "Укажите имя для своего профиля.")
		.max(50, "Имя не должно превышать 50 символов"),
	gender: z.enum(["male", "female"], { message: "Выберите свой пол" }),
	date: z
		.object({
			day: z.string(),
			month: z.string(),
			year: z.string(),
		})
		.superRefine((data, ctx) => {
			const { day, month, year } = data

			if (!day && !month && !year) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "Укажите полную дату рождения",
					fatal: true,
					path: [""],
				})
				return z.NEVER
			}

			if (!day) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "Введите день рождения",
					path: ["day"],
				})
			}

			if (!month) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "Введите месяц",
					path: ["month"],
				})
			}

			if (!year || year.length !== 4) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message:
						"Год рождения должен состоять из четырех цифр (например, 1990)",
					path: ["year"],
					fatal: true,
				})
				return z.NEVER
			}

			const minDate = z.coerce.date().min(new Date("1900-01-01"))
			const maxDate = z.coerce.date().max(new Date("2010-01-01"))

			const parsedMinDate = minDate.safeParse(year)
			const parsedMaxDate = maxDate.safeParse(year)

			if (!parsedMinDate.success || !parsedMaxDate.success) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: !parsedMinDate.success
						? "Год рождения должен быть не ранее 1900 г."
						: "Вы еще не достигли возраста, позволяющего создать аккаунт Spotify. Подробнее…",
					path: ["year"],
				})
			}
		}),
})

export type formSchemaType = z.infer<typeof registerInputSchema>

export const auth = getAuth(app)

export const doCreateUserWithEmailAndPassword = async (
	email: string,
	password: string
) => {
	try {
		await createUserWithEmailAndPassword(auth, email, password)
	} catch (error) {
		console.error(error)
	}
}
export const doSignUserWithEmailAndPassword = ({
	email,
	password,
}: {
	email: string
	password: string
}) => {
	return signInWithEmailAndPassword(auth, email, password)
}

export const doSignInWithGoogle = () => {
	const provider = new GoogleAuthProvider()
	provider.getCustomParameters
	return signInWithPopup(auth, provider)
}

export const doSignOut = () => {
	return auth.signOut()
}
