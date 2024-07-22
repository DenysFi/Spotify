import {
  forwardRef,
  type ElementRef,
  type ReactElement,
  type ReactNode,
} from "react";

import {
  Controller,
  FormProvider,
  useForm,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  type SubmitHandler,
  type UseFormProps,
  type UseFormReturn,
} from "react-hook-form";

import { z, type ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type FormProps<TFormValues extends FieldValues, Schema extends ZodType> = {
  onSubmit: SubmitHandler<TFormValues>;
  schema: Schema;
  className?: string;
  children: (methods: UseFormReturn<TFormValues>) => ReactNode;
  options?: UseFormProps<TFormValues>;
  id?: string;
};

function Form<
  Schema extends ZodType<any, any, any>,
  TFormValues extends FieldValues = z.infer<Schema>
>({
  onSubmit,
  children,
  className,
  options,
  id,
  schema,
}: FormProps<TFormValues, Schema>) {
  const form = useForm({ ...options, resolver: zodResolver(schema) });

  return (
    <FormProvider {...form}>
      <form
        className={className}
        onSubmit={form.handleSubmit(onSubmit)}
        id={id}
      >
        {children(form)}
      </form>
    </FormProvider>
  );
}

Form.displayName = "Form";

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return <Controller {...props} />;
};

Form.displayName = "FormField";

export { Form, FormField };
