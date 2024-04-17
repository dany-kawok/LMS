import Footer from "../components/Footer";
import Header from "../components/Header";
import { styled } from "styled-components";
import { Outlet } from "react-router-dom";
const Layout = () => {
  console.log("sss");
  return (
    <>
      <BackgroundContainer>
        <Header />
        <ContentWrapper>
          <Outlet />
        </ContentWrapper>
        <Footer />
      </BackgroundContainer>
      {/* here you can add any content after the main background */}
    </>
  );
};

const BackgroundContainer = styled.div`
  background-image: url("landing-img.jpg");
  background-size: cover;
  background-position: center;
  height: 100dvh;
  width: 100%;
  position: relative;
  overflow: hidden;
  z-index: 0;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    background-color: black;
    z-index: -1;
  }
`;
const ContentWrapper = styled.div`
  flex: 1; /* Take up remaining vertical space */
`;

export default Layout;
