import { useRouter } from "next/router";
import Link from "next/link";
import HtmlHeader from "@components/common/HtmlHeader";

import LoginForm from "@components/login/LoginSubmit";

import styled from "styled-components";
import { BsCheckCircleFill } from "react-icons/bs";
import TopNav from "@components/TopNav";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 61px);
  overflow: auto;
  background-color: var(--bg);
  h1 {
    margin-bottom: 40px;
    font-size: 25px;
    font-weight: normal;
  }
`;

const NotLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 55px;
  font-size: 20px;
  color: #b6b6b6;
  svg {
    margin-bottom: 25px;
    font-size: 55px;
  }
`;

const LoginWrap = styled.div`
  position: relative;
  width: 679px;
  margin: 0 auto;
  margin-top: 194px;
  figure.pass_guide {
    margin-top: 28px;
    text-align: center;
    p {
      display: inline;
      font-size: 18px;
    }
    a {
      display: inline;
      padding: 0;
      margin-left: 8px;
      font-size: 18px;
      font-weight: 400;
      color: #111;
      text-decoration: underline;
    }
  }
  a {
    display: block;
    width: 100%;
    padding: 20px 0;
    margin-bottom: 12px;
    border-radius: 12px;
    text-align: center;
    font-weight: 700;
    font-size: 20px;
    color: white;
    box-sizing: border-box;
    &:last-child {
      margin-bottom: 0;
    }
    &.email {
      padding: 28px 0;
      margin-bottom: 60px;
      background-color: var(--main);
    }
    &.naver {
      background-color: #41d97e;
    }
    &.kakao {
      background-color: #ffc700;
    }
    &.google {
      background-color: #7270ff;
    }
  }
`;

const Login = () => {
  const router = useRouter();

  const isRedirect = router.query.redirect;
  return (
    <>
      <HtmlHeader />
      <TopNav />
      <Main>
        <LoginWrap>
          {isRedirect ? (
            <NotLogin>
              <BsCheckCircleFill />
              <p>로그인이 필요한 서비스입니다.</p>
            </NotLogin>
          ) : isRedirect === undefined ? (
            <>
              <div className="login_title">
                <p>이색동물 유저들의 소통공간, Petbook</p>
                <h2>로그인 후 다양한 콘텐츠를 즐겨보세요!</h2>
              </div>
              <LoginForm.LoginSubmitForm />
              <LoginForm.LoginSubmitButton />
              <LoginForm.SocialLogin />
              <LoginForm.InduceSign />
              <figure className="pass_guide">
                <p>비밀번호를 잊으셨나요?</p>
                <Link href="/password">비밀번호 찾기</Link>
              </figure>
            </>
          ) : (
            <h2>로그인 완료 / 홈으로 이동</h2>
          )}
        </LoginWrap>
      </Main>
    </>
  );
};

export default Login;
