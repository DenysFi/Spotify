import AuthLayout from "@/components/layouts/auth-layout";
import LoginForm from "@/features/auth/components/login-form";
import React from "react";

export function LoginRoute() {
  return (
    <AuthLayout type="login">
      <LoginForm />
    </AuthLayout>
  );
}
