import { Link } from "react-router-dom";
import styled from "styled-components";

const Footer = () => {
  return (
    <Container>
      <LogoItem>
        <Link to="/">Fast Skill Academy</Link>
      </LogoItem>
      <CopyRight>Copyright &copy; 2024 - XTEAM</CopyRight>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  background-color: black;
  opacity: 0.5;
  height: 10vh;
  width: 100%;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LogoItem = styled.div`
  a {
    font-family: "Monoton", sans-serif;
    font-size: 1.5rem;
    font-weight: 400;
    display: flex;
    align-items: center;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #1f7fc4;
  }
`;

const CopyRight = styled.div``;

export default Footer;
