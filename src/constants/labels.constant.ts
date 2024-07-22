import Fb from "@/assets/facebook.svg";
import Apple from "@/assets/apple.svg";
import { doSignInWithGoogle } from "@/lib/auth";
import type { UserCredential } from "firebase/auth";

export interface ILabel {
  iconSrc: string;
  label: string;
  action: () => Promise<UserCredential>;
}

export const labels: ILabel[] = [
  {
    label: "через Google",
    iconSrc:
      "https://accounts.scdn.co/sso/images/new-google-icon.72fd940a229bc94cf9484a3320b3dccb.svg",
    action: doSignInWithGoogle,
  },
  {
    label: "через Facebook",
    iconSrc: Fb,
    action: doSignInWithGoogle,
  },
  {
    label: "через Apple",
    iconSrc: Apple,
    action: doSignInWithGoogle,
  },
];
