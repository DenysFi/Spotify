import { labels } from "@/constants/labels.constant";
import AuthWithLabels from "./ui/auth-with-lables";
import Title from "./ui/title";
import Divider from "@/components/ui/divider/divider";
import Input from "@/components/ui/form/input";
import PasswordInput from "@/components/ui/form/password-input";
import { Form } from "@/components/ui/form/form";
import { doSignUserWithEmailAndPassword, loginFormSchema } from "@/lib/auth";
import FormButton from "@/components/ui/form/from-button";
import ChangeForm from "./ui/change-form";
import { CircleAlert } from "lucide-react";
import { FirebaseError } from "firebase/app";
import { useState } from "react";

function Notification() {
  return (
    <div className="  mdmobile:w-[90%] rounded-md px-4 gap-2 bg-red-600 text-white flex items-center h-12 mb-6">
      <CircleAlert height={16} width={16} />
      <span>Неправильное имя пользователя или пароль.</span>
    </div>
  );
}

function LoginForm() {
  const [isNotFound, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    setIsLoading(true);
    try {
      await doSignUserWithEmailAndPassword({ email, password });
    } catch (error) {
      console.error(error);

      if (error instanceof FirebaseError) {
        if (
          error.code === "auth/user-not-found" ||
          error.code === "auth/wrong-password"
        ) {
          setIsError(true);
        }
      }
    }
    setIsLoading(false);
  }

  return (
    <>
      <Title>Войти в Spotify</Title>
      {isNotFound && <Notification />}
      <AuthWithLabels
        className="mdmobile:max-w-80 w-full"
        labels={labels}
        type="login"
      />
      <Divider className="my-10 opacity-50 w-[75%]" />
      <Form
        onSubmit={handleSubmit}
        schema={loginFormSchema}
        options={{ mode: "onChange" }}
        className=" w-full flex items-center justify-center  mdmobile:px-6"
      >
        {({ formState, register }) => {
          return (
            <div className="grid gap-4 mdmobile:max-w-80 w-full">
              <Input
                label="Электронная почта или имя пользователя"
                placeholder="Электронная почта или имя пользователя"
                registration={register("email")}
                errors={formState.errors["email"]}
              />
              <PasswordInput
                placeholder="Пароль"
                errors={formState.errors["password"]}
                registration={register("password")}
              />
              <FormButton isLoading={isLoading}>Войти</FormButton>
            </div>
          );
        }}
      </Form>
      <Divider className="my-10 opacity-50 w-[75%]" />
      <ChangeForm to={"/auth/register"} type="login">
        Регистрация в Spotify
      </ChangeForm>
    </>
  );
}

export default LoginForm;
