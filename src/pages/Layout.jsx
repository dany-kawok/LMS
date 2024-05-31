import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Outlet, useLocation } from "react-router-dom";
import Auth from "../components/Auth";
import styled from "styled-components";
import { Toaster } from "react-hot-toast";
import CoursesSwiper from "../components/CoursesSwiper";

const Layout = () => {
  const { pathname } = useLocation();
  const isAuthRoute = pathname.startsWith("/auth");

  const [bgImage, setBgImage] = useState(null);

  useEffect(() => {
    // Fetch the background image dynamically
    const fetchBgImage = async () => {
      try {
        const response = await fetch("bg-image.jpg"); // Replace "bg-image.jpg" with the path to your image
        if (response.ok) {
          setBgImage(`url(${response.url})`);
        } else {
          console.error("Failed to fetch background image");
        }
      } catch (error) {
        console.error("Error fetching background image:", error);
      }
    };

    fetchBgImage();
  }, []);

  return (
    <BackgroundContainer>
      <Header />
      <ContentWrapper>
        {isAuthRoute ? <Auth /> : <MainContent />}
      </ContentWrapper>
      <Footer />
      <Toaster />
    </BackgroundContainer>
  );
};

const MainContent = () => {
  const { pathname } = useLocation();

  return (
    <>
      <Outlet />
      {pathname === "/" ? <CoursesSwiper /> : null}
    </>
  );
};

const BackgroundContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-size: cover;
  background-position: center;
  width: 100%;
  position: relative;
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
  flex: 1;
`;

export default Layout;
