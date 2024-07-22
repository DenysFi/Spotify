import AuthLayout from "@/components/layouts/auth-layout";
import useClearFormData from "@/components/ui/form/useClearFormData.hook";
import RegisterForm from "@/features/auth/components/register-form";

export function RegisterRoute() {
  useClearFormData();
  return (
    <AuthLayout type="registrate">
      <RegisterForm />
    </AuthLayout>
  );
}
