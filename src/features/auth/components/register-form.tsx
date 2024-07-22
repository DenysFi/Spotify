import Divider from "@/components/ui/divider/divider";
import { Form } from "@/components/ui/form/form";
import FormStepper from "@/components/ui/form/form-stepper";
import FormButton from "@/components/ui/form/from-button";
import Input from "@/components/ui/form/input";

import { labels } from "@/constants/labels.constant";

import { Link, useLocation } from "react-router-dom";

import AboutStep from "./about-step";
import PasswordStep from "./password-step";
import AuthWithLabels from "./ui/auth-with-lables";

import {
  useFormNextStep,
  type TUseFormNextStepState,
} from "@/components/ui/form/useFormNextStep.hook";
import getFormData from "@/components/ui/stepper/services/getFormData";
import setFormData from "@/components/ui/stepper/services/setFormData";

import { registerInputSchema } from "@/lib/auth";
import Title from "./ui/title";
import ChangeForm from "./ui/change-form";

const tabs = [
  {
    title: "Придумай пароль",
    component: <PasswordStep />,
  },
  {
    title: "О себе",
    component: <AboutStep />,
  },
];

const InitialSchema = registerInputSchema.pick({ email: true });

const InitialRegisterFormScreen = () => {
  const { handleNextStep } = useFormNextStep();
  const { email } = getFormData();

  return (
    <div className="mobile:max-w-[25em] w-full mobile:px-8 px-4 bg-primaryBg pb-5">
      <Title>Зарегистрируйтесь и погрузитесь в музыку</Title>
      <Form
        onSubmit={handleNextStep}
        schema={InitialSchema}
        options={{ defaultValues: { email }, mode: "onChange" }}
      >
        {({ formState, register, watch }) => {
          setFormData({ ...getFormData(), ...watch() });

          return (
            <>
              <Input
                registration={register("email")}
                label="Электронная почта"
                placeholder="name@domain.com"
                errors={formState.errors["email"]}
              />
              <FormButton>Далее</FormButton>
            </>
          );
        }}
      </Form>

      <Divider className="my-10">или</Divider>
      <AuthWithLabels labels={labels} type="register" />
      <Divider className="my-10 opacity-30" />

      <ChangeForm to={"/auth/login"} type="login">
        Войдите
      </ChangeForm>
    </div>
  );
};

function RegisterForm() {
  const { state }: TUseFormNextStepState = useLocation();

  return state !== null ? (
    <div className="max-mobile:px-4  max-w-[436px] w-full bg-primaryBg  ">
      <FormStepper tabs={tabs} />
    </div>
  ) : (
    <InitialRegisterFormScreen />
  );
}

export default RegisterForm;
