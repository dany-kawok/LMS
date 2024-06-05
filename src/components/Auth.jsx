import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Form from "./Form";

// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import { logout } from "../redux/features/auth/authSlice";
// import { useDispatch } from "react-redux";
// import checkTokenExpiration from "../utils/TokenValidity";
// import Cookies from "js-cookie";
const Auth = () => {
  const location = useLocation();
  const action = location.pathname.includes("login") ? "login" : "signup";

  // const accessToken = Cookies.get("accessToken");

  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   if (accessToken) {
  //     const isTokenValid = checkTokenExpiration(accessToken);

  //     if (!isTokenValid) {
  //       // Token is expired
  //       Cookies.remove("accessToken");
  //       dispatch(logout());
  //       navigate("/auth/login");
  //     }
  //   }
  // }, [accessToken, dispatch, navigate]);

  return (
    <Container className="container">
      <AuthPanel>
        <Title>{action === "login" ? "Sign In" : "Sign Up"}</Title>
        <Form action={action} />
      </AuthPanel>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AuthPanel = styled.div`
  border-radius: 5px;
  width: 70%;
  height: fit-content;
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.75);

  @media (min-width: 768px) {
    padding: 10px;
    width: 60%;
  }
  @media (min-width: 992px) {
    padding: 10px;
    width: 40%;
  }
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: 600;
`;

export default Auth;
