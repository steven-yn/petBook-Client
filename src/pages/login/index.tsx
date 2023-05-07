import styled from "styled-components";
import LoginSubmit from "@components/login/LoginSubmit";

const Main = styled.main`
  flex-grow: 1;
  display: flex;
  align-items: center;
  max-width: calc(400px + 2rem);
  width: 100%;
  padding: 0 1rem;
  margin: 0 auto;
`;

const Login = () => {
  return (
    <Main>
      <LoginSubmit />
    </Main>
  );
};

export default Login;
