import CheckedCircle from "@/components/icons/checked-circle";
import EmptyCircle from "@/components/icons/empty-circle";
import { registerInputSchema } from "@/lib/auth";
import { cn } from "@/utils/cn";

import type { FieldError } from "react-hook-form";

function PasswordRequirementsItem({
  label,
  invalid,
  isInputEmpty,
}: {
  label: string;
  invalid: boolean | undefined;
  isInputEmpty: boolean;
}) {
  return (
    <li tabIndex={0} className="flex mb-2 items-center">
      {isInputEmpty || invalid ? <EmptyCircle /> : <CheckedCircle />}
      <span
        className={cn("ml-2 transition-colors", {
          "text-red-500": invalid,
        })}
      >
        {label}
        <span className="sr-only">Не соблюдено.</span>
      </span>
    </li>
  );
}

const passwordSchema = registerInputSchema.pick({ password: true });
const errorMessage = passwordSchema.safeParse({ password: "" }).error?.issues[0]
  .message;

function PasswordRequirements({
  error,
  isInputEmpty,
}: {
  error?: FieldError;
  isInputEmpty: boolean;
}) {
  const allMessages = errorMessage?.split("~");
  const allErrors = error?.message?.split("~");

  return (
    <div
      tabIndex={0}
      aria-label=" Requirements for password"
      className="text-[13px] text-white mt-6 mb-2"
    >
      <p className="font-bold mb-1">Пароль должен содержать как минимум:</p>
      <ul className="[&_li:last-child]:mb-0 pt-2" role="list">
        {allMessages?.map((message) => (
          <PasswordRequirementsItem
            key={message}
            isInputEmpty={isInputEmpty}
            label={message}
            invalid={allErrors?.includes(message)}
          />
        ))}
      </ul>
    </div>
  );
}

export default PasswordRequirements;
