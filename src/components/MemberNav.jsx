import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useGetLocationQuery } from "../redux/features/location/locationSlice";
import { useGetUserByIdQuery } from "../redux/features/users/usersSlice";
import ShoppingCartSidebar from "./ShoppingCartSidebar";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode"; // Import jwtDecode correctly

const MemberNav = () => {
  const { data: locationData, error: locationError } = useGetLocationQuery();
  const [time, setTime] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const accessToken = Cookies.get("accessToken");

  const isTokenExpired = (token) => {
    if (!token) return true;
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  };

  useEffect(() => {
    if (isTokenExpired(accessToken)) {
      Cookies.remove("accessToken");
      if (location.pathname === "/") {
        navigate("/");
      } else {
        navigate("/auth/login");
      }
    }
  }, [accessToken, location.pathname, navigate]);

  const userId = accessToken ? jwtDecode(accessToken).UserInfo.id : null;
  const { data: userData, error: userError } = useGetUserByIdQuery(userId, {
    skip: !userId, // Skip the query if userId is null
  });

  // Update the time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString());
    };

    updateTime(); // Set initial time
    const timerId = setInterval(updateTime, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timerId);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <MemberNavContainer>
        <WelcomeMessage>
          {userData
            ? `Welcome, ${userData.first_name} ${userData.last_name} `
            : "Welcome, Guest"}{" "}
          | {time} |{" "}
          {locationData
            ? `${locationData.city}, ${locationData.country}`
            : locationError
            ? "Location not available"
            : "Loading location..."}
        </WelcomeMessage>
        <NavLinks>
          <NavLink to="/dashboard">My Courses</NavLink>
          <CartIcon onClick={toggleSidebar}>
            <FaShoppingCart size={20} />
          </CartIcon>
        </NavLinks>
      </MemberNavContainer>
      <ShoppingCartSidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
    </>
  );
};

const MemberNavContainer = styled.div`
  background-color: #333;
  padding: 10px;
  opacity: 0.5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
`;

const WelcomeMessage = styled.span`
  font-size: 1rem;
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1rem;
  &:hover {
    text-decoration: underline;
  }
`;

const CartIcon = styled.div`
  cursor: pointer;
`;

export default MemberNav;
