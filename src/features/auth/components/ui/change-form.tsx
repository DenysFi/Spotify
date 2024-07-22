import { type FC, type ReactNode } from "react";
import { Link } from "react-router-dom";

const ChangeForm: FC<{
  to: string;
  children: ReactNode;
  type: "login" | "register";
}> = ({ to, children, type }) => {
  return (
    <p className="text-center text-white/50 text-base">
      {type === "login" ? "Нет аккаунта? " : "Уже есть аккаунт? "}
      <Link
        to={to}
        className="text-white underline font-bold hover:text-green-color transition-colors"
      >
        {children}
      </Link>
    </p>
  );
};
export default ChangeForm;
