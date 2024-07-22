import type { formSchemaType } from "@/lib/auth";
import { STEPPER_FORM_DATA_KEY } from "./constants";

export default function getFormData<
  T extends object = Partial<formSchemaType>
>(): T {
  const rawFormData = sessionStorage.getItem(STEPPER_FORM_DATA_KEY);

  if (!rawFormData) {
    return {} as T;
  }

  return JSON.parse(rawFormData);
}
