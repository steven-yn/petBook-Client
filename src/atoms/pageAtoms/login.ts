import { atom } from "recoil";

export const loginFormState = atom<{
  email: string;
  password: string;
}>({
  key: "loginFormState",
  default: {
    email: "",
    password: "",
  },
});

export const loginResultState = atom<{
  message: string;
}>({
  key: "loginResultState",
  default: {
    message: "",
  },
});
