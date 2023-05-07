import { loginFormState } from "@atoms/pageAtoms/login/userState";
import LoginInput from "@components/login/LoginInputBox";
import { authRequest } from "@lib/API/petBookAPI";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import useLoaderNavigate from "@lib/hooks/common/useLoaderNavigate";
import type { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import keyName from "@lib/commonValue/keyName";
import tokenParser from "@lib/server/parse/tokenParser";
import {
  FlexBox,
  ButtonBox,
  PassGuide,
  InfoText,
  Wrapper,
} from "./styled/styledLoginSubmit";
import ExclamationMarkCircle from "@components/common/icon/ExclamationMarkCircle";

export const SocialLogin = () => {
  const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_PY_URL as string;
  const router = useRouter();
  return (
    <ButtonBox>
      <a
        className="naver"
        href={`${BACKEND_BASE_URL}/naver/login${
          router.asPath ? `?redirect_url=${router.asPath}` : ""
        }`}
      >
        네이버로 로그인
      </a>
      <a
        className="kakao"
        href={`${BACKEND_BASE_URL}/kakao/login${
          router.asPath ? `?redirect_url=${router.asPath}` : ""
        }`}
      >
        카카오로 로그인
      </a>
      <a
        className="google"
        href={`${BACKEND_BASE_URL}/google/login${
          router.asPath ? `?redirect_url=${router.asPath}` : ""
        }`}
      >
        구글로 로그인
      </a>
    </ButtonBox>
  );
};

export const LoginSubmitForm = () => {
  return (
    <div>
      <div className="Login_Title">
        <Image
          src="/img/common/logo/logo.svg"
          alt="Petbokk logo"
          width={160}
          height={27}
        />
        <h2>로그인 후 다양한 콘텐츠를 즐겨보세요!</h2>
      </div>
      <form>
        <LoginInput IconType="Login" type="email" placeholder="이메일" />
        <LoginInput
          IconType="Password"
          type="password"
          placeholder="비밀번호"
        />
      </form>
    </div>
  );
};

export const LoginSubmitButton = () => {
  // { test용
  //   "email": "test@petbook.com",
  //   "password": "p@55w0rd1!"
  // }
  const [errorState, setErrorState] = useState(false);
  const [errorText, setErrorText] = useState("");
  const { navigator } = useLoaderNavigate();
  const loginForm = useRecoilValue(loginFormState);
  const { mutate, isLoading } = useMutation({
    mutationFn: authRequest.login,
    onSuccess: ({ data }) => {
      setErrorState(false);
      navigator({
        url: "/", // TODO: return_url 과 같은 query parameter를 받아서 해당 경로로 이동
        thenCallback: () => {
          if (data.token) {
            const { userInfo } = tokenParser(data.token);
            client.setQueryData([keyName.userInfo], userInfo);
          }
        },
      });
    },
    onError: (e) => {
      const errorObj = e as AxiosError;
      if (errorObj.response && errorObj.response.status === 401) {
        setErrorText("아이디 또는 비밀번호를 확인하세요.");
      }
      setErrorState(true);
    },
  });
  const client = useQueryClient();
  const onSubmit = () => {
    mutate({
      body: loginForm,
    });
  };
  return (
    <>
      <FlexBox>
        <InfoText>
          {errorState && (
            <>
              <ExclamationMarkCircle />
              {errorText}
            </>
          )}
        </InfoText>

        <label htmlFor="login">
          <input type="checkbox" id="login" />
          <p>로그인 상태유지</p>
        </label>
      </FlexBox>
      <button
        type="button"
        className="Primary"
        onClick={onSubmit}
        disabled={isLoading}
      >
        {isLoading ? "로그인 중..." : "로그인"}
      </button>
    </>
  );
};

export const LoginSubmit = () => {
  return (
    <Wrapper>
      <LoginSubmit.LoginSubmitForm />
      <LoginSubmit.LoginSubmitButton />
      <PassGuide>
        <Link href="/find/pass">계정을 잊으셨나요?</Link>
        <Link href="/register">회원가입</Link>
      </PassGuide>
    </Wrapper>
  );
};

LoginSubmit.LoginSubmitForm = LoginSubmitForm;
LoginSubmit.LoginSubmitButton = LoginSubmitButton;
LoginSubmit.SocialLogin = SocialLogin;

export default LoginSubmit;
