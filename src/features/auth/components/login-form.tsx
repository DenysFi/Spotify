import Divider from "@/components/ui/divider/divider";
import { Form } from "@/components/ui/form/form";
import FormButton from "@/components/ui/form/from-button";
import Input from "@/components/ui/form/input";
import PasswordInput from "@/components/ui/form/password-input";
import { labels } from "@/constants/labels.constant";
import { loginFormSchema } from "@/lib/auth";
import { FirebaseError } from "firebase/app";
import { CircleAlert } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/useAuth";
import AuthWithLabels from "./ui/auth-with-lables";
import ChangeForm from "./ui/change-form";
import Title from "./ui/title";

function Notification() {
  return (
    <div className="mb-6 flex h-12 items-center gap-2 rounded-md bg-red-600 px-4 text-white mdmobile:w-[90%]">
      <CircleAlert height={16} width={16} />
      <span>Неправильное имя пользователя или пароль.</span>
    </div>
  );
}

function LoginForm() {
  const [isNotFound, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const user = useAuth();
  async function handleSubmit({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    setIsLoading(true);
    try {
      //await doSignUserWithEmailAndPassword({ email, password })

      await fetch("/login?useCookies=true", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((data) => {
          // handle success or error from the server
          if (data.ok) {
            user.setCurrentUser({ email, displayName: email });
            return;
          }
          setIsError(true);
        })
        .catch((error) => {
          // handle network error
          console.error(error);
        });
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
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Title>Войти в MusicLib</Title>
      {isNotFound && <Notification />}
      <AuthWithLabels
        className="w-full mdmobile:max-w-80"
        labels={labels}
        type="login"
      />
      <Divider className="my-10 w-[75%] opacity-50" />
      <Form
        onSubmit={handleSubmit}
        schema={loginFormSchema}
        options={{ mode: "onChange" }}
        className="flex w-full items-center justify-center mdmobile:px-6"
      >
        {({ formState, register }) => {
          return (
            <div className="grid w-full gap-4 mdmobile:max-w-80">
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
      <Divider className="my-10 w-[75%] opacity-50" />
      <ChangeForm to={"/auth/register"} type="login">
        Регистрация в MusicLib
      </ChangeForm>
    </>
  );
}

export default LoginForm;
