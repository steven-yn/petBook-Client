import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { useSetResource } from "@lib/hooks/common/useResource";

import { registerFormState } from "@atoms/pageAtoms/register";
import navigator from "@lib/modules/navigator";

import { ErrorResponse } from "@lib/API/petBookAPI/types/userRequest";
import { REGISTER_CREATE } from "./RegisterForm";
import styled from "styled-components";

const RegisterButton = () => {
  const registerForm = useRecoilValue(registerFormState);
  const { data, isSuccess, isError, error, mutate } =
    useSetResource(REGISTER_CREATE);
  const [validation, setValidation] = useState(false);

  const Sign = () => {
    const { passwordCheck, name, agree, ...newObj } = registerForm;
    mutate(newObj);
  };

  // 버튼 활성 구독상태 UI 적용
  useEffect(() => {
    const newArr = Object.values(registerForm);
    const active = newArr.every((x) => x !== null && x !== "");
    setValidation(active);
  }, [registerForm]);

  // data 구독상태
  useEffect(() => {
    if (isSuccess) {
      navigator({ url: "/login" });
      // mutate({
      //   email: registerForm.email,
      //   password: registerForm.password,
      // });
    }
    if (isError) {
      const errorObj = error as ErrorResponse;
      alert(errorObj.response.data.message);
    }
  }, [isError, data]);

  return (
    <SignButton
      active={validation}
      onClick={Sign}
      type="button"
      className="Primary"
    >
      회원가입
    </SignButton>
  );
};

const SignButton = styled.button<{ active: boolean }>`
  background-color: ${({ active }) =>
    active ? "var(--primary)" : "var(--disabled)"} !important;
  pointer-events: ${({ active }) => (active ? "unset" : "none")};
  color: ${({ active }) => (active ? "#fff" : "var(--black_05)")} !important; ;
`;

export default RegisterButton;
