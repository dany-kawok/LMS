import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useLogoutAPIMutation } from "../redux/features/auth/authApiSlice";
import { useGetUserByIdQuery } from "../redux/features/users/usersSlice";
import ShoppingCartSidebar from "./ShoppingCartSidebar";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { logout } from "../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import checkTokenExpiration from "../utils/TokenValidity";

const MemberNav = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const refreshToken = Cookies.get("jwt");
  const accessToken = Cookies.get("accessToken");
  const [logoutAPI] = useLogoutAPIMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (accessToken) {
  //     const isTokenValid = checkTokenExpiration(accessToken);
  //     console.log(isTokenValid);
  //     if (!isTokenValid) {
  //       // logoutAPI();
  //       // dispatch(logout());
  //       navigate("/auth/login");
  //     }
  //   }
  // }, [accessToken, dispatch, navigate, logoutAPI]);

  const userId = accessToken ? jwtDecode(accessToken).UserInfo.id : null;
  const { data: userData } = useGetUserByIdQuery(userId, {
    skip: !userId,
  });

  const cartLength = useSelector((state) => state.sCartDetails.length);

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
        </WelcomeMessage>
        <NavLinks>
          <NavLink to="/dashboard">My Courses</NavLink>
          <CartIcon onClick={toggleSidebar}>
            <FaShoppingCart size={20} />
            {cartLength > 0 && <CartIndicator>{cartLength}</CartIndicator>}
          </CartIcon>
        </NavLinks>
      </MemberNavContainer>
      <ShoppingCartSidebar
        $isOpen={isSidebarOpen}
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
  margin-right: 20px;
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
  position: relative;
  cursor: pointer;
`;

const CartIndicator = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: red;
  color: white;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 50%;
`;

export default MemberNav;
