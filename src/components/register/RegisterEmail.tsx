import React, { ChangeEventHandler, MouseEventHandler, useState } from "react";
import useSelectorState from "@lib/hooks/common/useSelectorState";
import { registerFormState } from "@atoms/pageAtoms/register";
import { useMutation } from "@tanstack/react-query";
import { registerRequest } from "@lib/API/petBookAPI";
import Input from "@components/common/Input";
import Message from "./Message";

const RegisterEmail = () => {
  const [message, setMessage] = useState<{
    type: "" | "success" | "error";
    value: string;
  }>({
    type: "",
    value: "",
  });
  const [registerForm, setRegisterForm] = useSelectorState(registerFormState, {
    email: "",
  });
  const [code, setCode] = useState("");
  const { mutate } = useMutation({
    mutationFn: registerRequest.sendVerificationEmail,
    onSuccess: () => {
      setMessage({
        type: "",
        value: "인증번호가 발송되었습니다. 메일함을 확인해주세요!",
      });
    },
  });

  // input change
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setRegisterForm((el) => ({ ...el, email: e.target.value }));
  };
  const onChangeCode: ChangeEventHandler<HTMLInputElement> = (e) => {
    setCode(e.target.value);
  };

  const onCertification: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    mutate({ email: registerForm.email });
  };
  const onCertificationConfirm: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    console.log(code);
  };

  return (
    <div>
      <Input
        iconType="Login"
        onChange={onChange}
        placeholder="이메일"
        type="email"
        name="email"
        Button={
          <button type="submit" onClick={onCertification}>
            인증하기
          </button>
        }
      />
      <Input
        iconType="Login_Passcode_Disabled"
        onChange={onChangeCode}
        placeholder="인증번호 4자리"
        name="code"
        type="text"
        Button={
          <button type="submit" onClick={onCertificationConfirm}>
            코드확인
          </button>
        }
      />
      <Message type={message.type} value={message.value} />
    </div>
  );
};
export default RegisterEmail;
