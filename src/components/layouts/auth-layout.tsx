import { cn } from "@/utils/cn";
import { type PropsWithChildren } from "react";
import Head from "../seo/head";
import Logo from "../ui/logo/logo";

interface AuthLayoutProps extends PropsWithChildren {
  type: "login" | "registrate";
}

function Header() {
  return (
    <div className="pb-6 pt-8">
      <Logo color="white" />
    </div>
  );
}

function AuthLayout({ children, type }: AuthLayoutProps) {
  const headTitle = type.charAt(0).toUpperCase() + type.slice(1);
  const isLogin = type === "login";

  return (
    <section
      className={cn("flex h-full w-full flex-col items-center bg-primaryBg", {
        "mdmobile:bg-primaryBgGradient mdmobile:p-8": isLogin,
      })}
    >
      <Head title={`${headTitle} | MusicLib`} />
      {!isLogin && (
        <>
          <Header />
          {children}
        </>
      )}

      {isLogin && (
        <div className="flex w-full max-w-[45em] flex-col items-center bg-primaryBg px-4 pb-8 mdmobile:rounded-lg">
          <Header />
          {children}
        </div>
      )}
    </section>
  );
}

export default AuthLayout;
