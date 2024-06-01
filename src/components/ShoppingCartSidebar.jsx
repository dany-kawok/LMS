import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { useGetAllCoursesQuery } from "../redux/features/courses/coursesSlice";

const ShoppingCartSidebar = ({ isOpen, toggleSidebar }) => {
  const { data: cartItems = [], isLoading } = useGetAllCoursesQuery(); // Replace this with your actual cart query

  return (
    <>
      <Overlay isOpen={isOpen} onClick={toggleSidebar} />
      <SidebarContainer isOpen={isOpen}>
        <SidebarHeader>
          <SidebarTitle>Shopping Cart</SidebarTitle>
          <CloseIcon onClick={toggleSidebar}>
            <FaTimes size={20} />
          </CloseIcon>
        </SidebarHeader>
        <SidebarContent>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <SkeletonCartItem key={index}>
                <SkeletonCartItemImage />
                <SkeletonCartItemDetails>
                  <SkeletonCartItemTitle />
                  <SkeletonCartItemPrice />
                </SkeletonCartItemDetails>
              </SkeletonCartItem>
            ))
          ) : cartItems.length === 0 ? (
            <EmptyMessage>Your cart is empty.</EmptyMessage>
          ) : (
            cartItems.map((item, index) => (
              <CartItem key={index}>
                <CartItemImage src={item.image} alt={item.title} />
                <CartItemDetails>
                  <CartItemTitle>{item.title}</CartItemTitle>
                  <CartItemPrice>${item.price}</CartItemPrice>
                </CartItemDetails>
              </CartItem>
            ))
          )}
        </SidebarContent>
        <SidebarFooter>
          <CheckoutButton to="/checkout">Check Out</CheckoutButton>
        </SidebarFooter>
      </SidebarContainer>
    </>
  );
};

const Overlay = styled.div`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 300px;
  background-color: #666;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
  transform: ${({ isOpen }) => (isOpen ? "translateX(0)" : "translateX(100%)")};
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 250px;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #333;
  color: white;
`;

const CloseIcon = styled.div`
  cursor: pointer;
`;

const SidebarTitle = styled.h2`
  margin: 0;
`;

const SidebarContent = styled.div`
  padding: 20px;
  flex-grow: 1;
  overflow-y: auto;

  /* Hide scrollbar for WebKit browsers */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const EmptyMessage = styled.p`
  text-align: center;
  color: #666;
`;

const CartItem = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const CartItemImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  margin-right: 10px;
`;

const CartItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CartItemTitle = styled.h3`
  margin: 0;
  font-size: 1rem;
`;

const CartItemPrice = styled.p`
  margin: 0;
  color: #666;
`;

const SidebarFooter = styled.div`
  padding: 20px;
  background-color: #f1f1f1;
  text-align: center;
`;

const CheckoutButton = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  background-color: #333;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  &:hover {
    background-color: #555;
  }
`;

/* Skeleton Styles */
const SkeletonCartItem = styled.div`
  display: flex;
  margin-bottom: 20px;
  animation: pulse 1.5s infinite ease-in-out;
`;

const SkeletonCartItemImage = styled.div`
  width: 60px;
  height: 60px;
  background-color: #ccc;
  margin-right: 10px;
`;

const SkeletonCartItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const SkeletonCartItemTitle = styled.div`
  width: 70%;
  height: 20px;
  background-color: #ccc;
  margin-bottom: 10px;
`;

const SkeletonCartItemPrice = styled.div`
  width: 50%;
  height: 20px;
  background-color: #ccc;
`;

const pulse = `
  @keyframes pulse {
    0% {
      background-color: #444;
    }
    50% {
      background-color: #555;
    }
    100% {
      background-color: #444;
    }
  }
`;

export default ShoppingCartSidebar;
