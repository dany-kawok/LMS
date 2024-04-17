import { Link } from "react-router-dom";
import { styled } from "styled-components";
const Footer = () => {
  return (
    <Container>
      <LogoItem>
        <Link to="/">
          Movies<span>.hd</span>
        </Link>
      </LogoItem>
      <CopyRight>Copyright &copy; 2024 - Movies</CopyRight>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 10dvh;
  width: 100%;
  background-color: black;
  opacity: 0.5;
  position: fixed;
  /* overflow: hidden; */

  bottom: 0;
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
    color: red;
  }
`;
const CopyRight = styled.div``;
export default Footer;
