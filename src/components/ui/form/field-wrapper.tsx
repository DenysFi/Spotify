import { cn } from "@/utils/cn";
import { type ReactNode } from "react";
import Label from "../label/label";
import type { FieldError } from "react-hook-form";
import Error from "./error";

export type TError = FieldError | undefined | string;

export type TErrors = TError[];

type FieldWrapperProps = {
  label?: string;
  errors?: TErrors | TError;
  children: ReactNode;
  sublabel?: string;
  className?: string;
  labelDisabled?: boolean;
  showError?: boolean;
};

export type FieldWrapperPassThroughProps = Pick<
  FieldWrapperProps,
  "errors" | "label"
>;

function FieldWrapper({
  label,
  children,
  sublabel,
  className,
  errors,
  showError = true,
  labelDisabled = false,
}: FieldWrapperProps) {
  const body = (
    <>
      <span className="text-white text-sm font-bold">{label}</span>
      {sublabel && <p className="text-mainGray text-xs">{sublabel}</p>}
      <div className={cn("relative mt-2 ", className)}>{children}</div>
    </>
  );

  const Errors = showError && errors && (
    <div className="mt-3 grid gap-2">
      {[errors]?.flat().map((error, i) => (
        <Error
          key={i}
          errorMessage={typeof error === "string" ? error : error?.message}
        />
      ))}
    </div>
  );

  return (
    <>
      {labelDisabled ? (
        <>
          {body}
          {Errors}
        </>
      ) : (
        <div>
          <Label aria-invalid={!!errors}>{body}</Label>
          {Errors}
        </div>
      )}
    </>
  );
}
FieldWrapper.displayName = "FieldWrapper";
export default FieldWrapper;
