import { atom } from "recoil";

export const registerFormState = atom<{
  email: string;
  password: string;
  passwordCheck: string;
  name: string;
  nickname: string;
  agree: boolean;
}>({
  key: "registerFormState",
  default: {
    email: "",
    password: "",
    passwordCheck: "",
    name: "",
    nickname: "",
    agree: false,
  },
});

export const registerFormCheckEmailState = atom<{
  userId: string;
}>({
  key: "registerFormCheckEmailState",
  default: {
    userId: "",
  },
});

export const checkedNicknameState = atom<{
  nickname: string;
}>({
  key: "checkedNicknameState",
  default: {
    nickname: "",
  },
});

export const validationRegisterState = atom<{
  password: boolean;
  name: boolean;
  nickname: boolean;
  agree: boolean;
}>({
  key: "validationCheckRegister",
  default: {
    password: false,
    name: false,
    nickname: false,
    agree: false,
  },
});
