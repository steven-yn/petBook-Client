import styled from "styled-components";
import RegisterForm from "@components/register/RegisterForm";

const Container = styled.main`
  overflow: auto;
  height: calc(100vh - 61px);
  background-color: var(--bg_white_02);
`;

const Register = () => {
  return (
    <Container>
      <RegisterForm />
    </Container>
  );
};
export default Register;
