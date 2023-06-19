import { loginFormState, loginResultState } from "@atoms/pageAtoms/login";
import { authRequest } from "@lib/API/petBookAPI";
import { ChangeEventHandler } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import useLoaderNavigate from "@lib/hooks/common/useLoaderNavigate";
import type { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import tokenParser from "@lib/server/parse/tokenParser";
import ExclamationMarkCircle from "@components/common/icon/ExclamationMarkCircle";
import Input from "@components/common/Input";
import styled from "styled-components";
import { cookieKeyName } from "@lib/globalConst";

const LoginSubmitForm = () => {
  const setLoginForm = useSetRecoilState(loginFormState);
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const type = e.target.name;
    setLoginForm((user) => ({
      ...user,
      [type]: e.target.value,
    }));
  };
  return (
    <form>
      <Input
        iconType="Login"
        type="email"
        name="email"
        placeholder="이메일"
        onChange={onChange}
      />
      <Input
        iconType="Password"
        type="password"
        name="password"
        placeholder="비밀번호"
        onChange={onChange}
      />
      <FlexBox>
        <Message />
        <label htmlFor="login">
          <input type="checkbox" id="login" />
          <p>로그인 상태유지</p>
        </label>
      </FlexBox>
      <LoginSubmitButton />
    </form>
  );
};

const Message = () => {
  const { message } = useRecoilValue(loginResultState);
  return (
    <InfoText>
      {message && (
        <>
          <ExclamationMarkCircle />
          {message}
        </>
      )}
    </InfoText>
  );
};

const LoginSubmitButton = () => {
  // { test용
  //   "email": "test@petbook.com",
  //   "password": "p@55w0rd1!"
  // }
  const setLoginResultState = useSetRecoilState(loginResultState);
  const { navigator } = useLoaderNavigate();
  const loginForm = useRecoilValue(loginFormState);
  const client = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: authRequest.login,
    onSuccess: ({ response }) => {
      setLoginResultState({ message: "" });
      navigator({
        url: "/", // TODO: return_url 과 같은 query parameter를 받아서 해당 경로로 이동
        thenCallback: () => {
          if (response.data.token) {
            const { userInfo } = tokenParser(response.data.token);
            client.setQueryData([cookieKeyName.userInfo], userInfo);
          }
        },
      });
    },
    onError: (e) => {
      const errorObj = e as AxiosError;
      if (errorObj.response && errorObj.response.status === 401) {
        setLoginResultState({ message: "아이디 또는 비밀번호를 확인하세요." });
      }
    },
  });
  const onSubmit = () => {
    mutate({
      body: loginForm,
    });
  };
  return (
    <button
      type="button"
      className="Primary"
      onClick={onSubmit}
      disabled={isLoading}
    >
      {isLoading ? "로그인 중..." : "로그인"}
    </button>
  );
};

const InfoText = styled.p`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-top: 4px;
  font-size: 0.875rem;
  color: red;
  line-height: 1.25rem;
`;

const FlexBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.25rem;
`;

export default LoginSubmitForm;
