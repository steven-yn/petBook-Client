import React, { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { registerFormState } from "@atoms/pageAtoms/register";

import useSelectorState from "@lib/hooks/common/useSelectorState";
import { passwordCheck } from "@lib/utils/validation/checkValidationRegister";
import Input from "@components/common/Input";
import Message from "./Message";

const RegisterPassword = () => {
  const [success, setSuccess] = useState(false);
  const [passInfoMsg, setPassInfoMsg] = useState("");
  const pass2Ref = useRef<HTMLInputElement | null>(null);
  const [checkPass, setCheckPass] = useState(false);
  const [passval, setPass] = useState({
    pass1: "",
    pass2: "",
  });
  const [registerForm, setRegisterForm] = useSelectorState(registerFormState, {
    password: "",
  });

  const onChangePass2: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    setPass((pass) => ({
      ...pass,
      pass2: e.target.value,
    }));
  };
  const onChangePass1: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    setPass({ pass1: e.target.value, pass2: "" });
    setCheckPass(false);
  };
  const onBlur: ChangeEventHandler<HTMLInputElement> = () => {
    const checkValidationText = passwordCheck(passval.pass1);
    if (checkValidationText === "") {
      setSuccess(false);
      setCheckPass(true); // 두번째 필드
    } else {
      setPassInfoMsg(checkValidationText);
      setSuccess(true);
      setCheckPass(false); // 두번째 필드
      setTimeout(() => {
        if (pass2Ref && pass2Ref.current) {
          pass2Ref.current.blur();
        }
      }, 0);

      setPass((el) => ({ ...el, pass2: "" }));
    }
  };

  useEffect(() => {
    let successState = false;
    if (passval.pass1 === passval.pass2 && passval.pass1 !== "") {
      successState = true;
    } else {
      successState = false;
    }
    setRegisterForm((el) => ({
      ...el,
      password: successState === true ? passval.pass2 : "",
    }));
    setSuccess(successState);
    setPassInfoMsg("비밀번호가 일치합니다");
  }, [passval.pass2]);

  return (
    <div>
      <Input
        iconType="Password"
        type="password"
        name="password"
        placeholder="비밀번호 : 영문 8자리 이상 대소문자 + 숫자 + 특수문자"
        onChange={onChangePass1}
      />
      <Input
        type="password"
        iconType="Password_Check_Disabled"
        name="passwordCheck"
        placeholder="비밀번호 확인"
        onChange={onChangePass2}
      />
    </div>
  );
};

export default RegisterPassword;
