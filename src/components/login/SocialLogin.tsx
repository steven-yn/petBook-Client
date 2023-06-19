import { useRouter } from "next/router";
import styled from "styled-components";

const SocialLogin = () => {
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

const ButtonBox = styled.div`
  margin-top: 42px;
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
      background-color: var(--primary);
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
export default SocialLogin;
