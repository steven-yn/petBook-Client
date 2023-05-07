import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import LoginSubmitForm from "@components/login/LoginSubmitForm";

const Login = () => {
  return (
    <Main>
      <div>
        <div className="Login_Title">
          <Image
            src="/img/common/logo/logo.svg"
            alt="Petbook logo"
            width={160}
            height={27}
          />
          <p>로그인 후 다양한 콘텐츠를 즐겨보세요!</p>
        </div>
        <LoginSubmitForm />
        <PassGuide>
          <Link href="/find/pass">계정을 잊으셨나요?</Link>
          <Link href="/register">회원가입</Link>
        </PassGuide>
      </div>
    </Main>
  );
};

const Main = styled.main`
  flex-grow: 1;
  display: flex;
  align-items: center;
  max-width: calc(400px + 2rem);
  width: 100%;
  padding: 0 1rem;
  margin: 0 auto;
  & > div {
    width: 100%;
  }
  .Login_Title {
    text-align: center;
    & > p {
      font-size: 1.375rem;
      margin-bottom: 32px;
      margin-top: 16px;
      font-weight: bold;
    }
  }
`;

const PassGuide = styled.div`
  margin-top: 1.25rem;
  text-align: center;
  & > a {
    position: relative;
    display: inline-block;
    padding: 0 1.25rem;
    font-size: 0.875rem;
    color: #777774;
    &::after {
      content: "";
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 1px;
      height: 12px;
      background-color: #e0dfd9;
    }
    &:last-child {
      color: #ff6847;
      &::after {
        display: none;
      }
    }
  }
`;

export default Login;
