import { useLocation } from "react-router-dom";
import { styled } from "styled-components";
import Form from "./Form";
const Auth = () => {
  const { pathname } = useLocation();
  const action = pathname === "/auth/login" ? "login" : "signup";
  return (
    <>
      <Container className="container">
        <AuthPanel>
          <Title> {action === "login" ? "Sign In" : "Sign Up"}</Title>
          <Form action={action}></Form>
        </AuthPanel>
      </Container>
    </>
  );
};
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const AuthPanel = styled.div`
  border-radius: 5px;
  width: 35%;
  height: 360px;
  padding: 10px 20px;
  text-align: center;

  background-color: rgba(0, 0, 0, 0.75);
  @media (max-width: 992px) {
    padding: 10px;
    width: 80%;
  }
`;
const Title = styled.h1`
  font-size: 40px;
  font-weight: 600;
`;
export default Auth;
