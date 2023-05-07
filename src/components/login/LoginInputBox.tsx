import { loginFormState } from "@atoms/pageAtoms/login/userState";
import React, { ChangeEventHandler } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

interface LoginProps {
  placeholder: string;
  type: string;
  IconType: string;
}

const LoginInput = ({ placeholder, type, IconType }: LoginProps) => {
  const setLoginForm = useSetRecoilState(loginFormState);
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setLoginForm((user) => ({
      ...user,
      [type]: e.target.value,
    }));
  };

  return (
    <div>
      <InputBox>
        <IconBox>
          <div className={IconType} />
        </IconBox>
        <input type={type} placeholder={placeholder} onChange={onChange} />
      </InputBox>
    </div>
  );
};

const IconBox = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
`;

const InputBox = styled.div`
  position: relative;
  margin-bottom: 8px;
`;

export default LoginInput;
