import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useGetLocationQuery } from "../redux/features/location/locationSlice";
import ShoppingCartSidebar from "./ShoppingCartSidebar";

const MemberNav = () => {
  const { data: locationData, error: locationError } = useGetLocationQuery();
  const [time, setTime] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
          Welcome, Guest | {time} |{" "}
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
