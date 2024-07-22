import type { formSchemaType } from "@/lib/auth";
import { STEPPER_FORM_DATA_KEY } from "./constants";

export default (formData: Partial<formSchemaType>) => {
  sessionStorage.setItem(STEPPER_FORM_DATA_KEY, JSON.stringify(formData));
};
