import styled from "styled-components";
import Image from "next/image";
import RegisterAgree from "@components/register/RegisterAgree";
import RegisterButton from "@components/register/RegisterButton";
import RegisterEmail from "@components/register/RegisterEmail";
import RegisterName from "@components/register/RegisterName";
import RegisterPassword from "@components/register/RegisterPassword";

const Main = styled.main`
  width: calc(100% - 2rem);
  max-width: 400px;
  margin: 3.375rem auto;
  padding-bottom: 5rem;
  .Register_Title {
    text-align: center;
    margin-bottom: 2.5rem;
  }
  & > form {
    display: flex;
    flex-direction: column;
    gap: 1.625rem;
  }
`;

const Register = () => {
  return (
    <Main>
      <div className="Register_Title">
        <Image
          src="/img/common/logo/logo.svg"
          alt="Petbook Logo"
          width={160}
          height={27}
        />
      </div>
      <form>
        <RegisterEmail />
        <RegisterPassword />
        <RegisterName />
        <RegisterAgree />
        <RegisterButton />
      </form>
    </Main>
  );
};
export default Register;
