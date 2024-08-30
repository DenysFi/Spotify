import FieldWrapper from "@/components/ui/form/field-wrapper"
import { Form, FormField } from "@/components/ui/form/form"
import FormButton from "@/components/ui/form/from-button"
import Input from "@/components/ui/form/input"
import {
	RadioControlled,
	RadioItem,
	RadioLabel,
	RadioWrapper,
} from "@/components/ui/radio/radio"
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/form/select"

import getFormData from "@/components/ui/stepper/services/getFormData"
import setFormData from "@/components/ui/stepper/services/setFormData"

import {
	doCreateUserWithEmailAndPassword,
	registerInputSchema,
} from "@/lib/auth"

import type { z } from "zod"
import {
	useFormNextStep,
	type TUseFormNextStepState,
} from "@/components/ui/form/useFormNextStep.hook"
import { useLocation, useNavigate } from "react-router-dom"
import { doc, setDoc } from "firebase/firestore"
import { db } from "@/lib/db"
import { useAuth } from "../context/useAuth"
import { updateProfile } from "firebase/auth"
import { useState } from "react"

const aboutSchema = registerInputSchema.omit({
	email: true,
	password: true,
})

type TAboutSchema = z.infer<typeof aboutSchema>

function AboutStep() {
	const { username, date, gender = "" } = getFormData<TAboutSchema>()
	const { day = "", month = "", year = "" } = date || {}
	const { currentUser } = useAuth()
	const { state }: TUseFormNextStepState = useLocation()
	const [isLoading, setIsLoading] = useState(false)
	const navigate = useNavigate()

	const { handleNextStep } = useFormNextStep(async () => {
		setIsLoading(true)
		const { password, email, username, ...rest } = getFormData()

		if (!state?.authWithService) {
			await doCreateUserWithEmailAndPassword(email!, password!, username!)
		}

		if (state?.authWithService && currentUser) {
			await updateProfile(currentUser, {
				displayName: username,
			})
		}

		if (currentUser) {
			await setDoc(doc(db, "users", currentUser.uid), rest)
			navigate("/app")
		}
		setIsLoading(false)
	})

	return (
		<Form
			className="mobile:max-w-[25em] w-full mobile:px-10  mt-8 mx-auto pb-5"
			onSubmit={handleNextStep}
			schema={aboutSchema}
			options={{
				defaultValues: {
					username,
					date: { day, month, year },
					gender,
				},
				mode: "onChange",
			}}
		>
			{({ register, formState, watch, control }) => {
				setFormData({
					...getFormData(),
					...watch(),
					gender: watch("gender") as "male" | "female" | undefined,
				})

				return (
					<>
						<Input
							registration={register("username")}
							label="Название"
							errors={formState.errors["username"]}
							sublabel={"Ваше имя появится в профиле"}
						/>

						<div className="mt-4">
							<FieldWrapper
								label="Дата рождения"
								sublabel="Зачем указывать дату рождения? Подробнее…."
								className="flex gap-2"
								errors={[
									formState.errors.date?.message,
									formState.errors.date?.day,
									formState.errors.date?.month,
									formState.errors.date?.year,
								]}
							>
								<Input
									wrapperDisabled
									registration={register("date.day")}
									errors={
										formState.errors.date?.message || formState.errors.date?.day
									}
									className="w-[62px]"
									placeholder="дд"
									inputMode="numeric"
									maxLength={2}
								/>
								<FormField
									name="date.month"
									control={control}
									render={({ field, fieldState }) => (
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<SelectTrigger
												isError={
													!!formState.errors.date?.message || fieldState.invalid
												}
												aria-label="месяц"
											>
												<SelectValue placeholder="Месяц " />
											</SelectTrigger>
											<SelectContent position="popper">
												<SelectGroup>
													<SelectLabel>Месяц</SelectLabel>
													<SelectItem value="1">Январь</SelectItem>
													<SelectItem value="2">Февраль</SelectItem>
													<SelectItem value="3">Март</SelectItem>
													<SelectItem value="4">Апрель</SelectItem>
													<SelectItem value="5">Май</SelectItem>
													<SelectItem value="6">Июнь</SelectItem>
													<SelectItem value="7">Июль</SelectItem>
													<SelectItem value="8">Август</SelectItem>
													<SelectItem value="9">Сентябрь</SelectItem>
													<SelectItem value="10">Октябрь</SelectItem>
													<SelectItem value="11">Ноябрь</SelectItem>
													<SelectItem value="12">Декабрь</SelectItem>
												</SelectGroup>
											</SelectContent>
										</Select>
									)}
								/>
								<Input
									wrapperDisabled
									aria-label="год рожденя"
									registration={register("date.year")}
									errors={
										formState.errors.date?.message ||
										formState.errors.date?.year
									}
									placeholder="гггг"
									inputMode="numeric"
									maxLength={4}
									className="w-[93px]"
								/>
							</FieldWrapper>
						</div>
						<div className="mt-4">
							<FieldWrapper
								labelDisabled
								label="Пол"
								errors={[formState.errors.gender]}
								sublabel="Мы учитываем пол при подборе персональных рекомендаций и рекламы."
								className="flex gap-2"
							>
								<RadioControlled
									className="flex flex-wrap gap-6 mt-2"
									name="gender"
									aria-label="Пол"
								>
									<RadioLabel>
										<RadioWrapper>
											<RadioItem value="female"></RadioItem>
											Женщина
										</RadioWrapper>
									</RadioLabel>
									<RadioLabel>
										<RadioWrapper>
											<RadioItem value="male"></RadioItem>
											Мужчина
										</RadioWrapper>
									</RadioLabel>
								</RadioControlled>
							</FieldWrapper>
						</div>

						<FormButton isLoading={isLoading}>Зарегестрироваться</FormButton>
					</>
				)
			}}
		</Form>
	)
}

export default AboutStep
