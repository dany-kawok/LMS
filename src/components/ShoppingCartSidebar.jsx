import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaTimes, FaTrash } from "react-icons/fa";
import {
  useGetUserCartQuery,
  useRemoveFromCartMutation,
  useClearCartMutation,
} from "../redux/features/sCart/sCartSlice";

const ShoppingCartSidebar = ({ isOpen, toggleSidebar }) => {
  const { data: cartItems = [], isLoading, refetch } = useGetUserCartQuery();
  const [removeFromCart] = useRemoveFromCartMutation();
  const [clearCart] = useClearCartMutation();

  const handleRemove = async (courseId) => {
    await removeFromCart(courseId);
    refetch();
  };

  const handleClearCart = async () => {
    await clearCart();
    refetch();
  };

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

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
                <RemoveButton onClick={() => handleRemove(item.courseId)}>
                  <FaTrash />
                </RemoveButton>
              </CartItem>
            ))
          )}
        </SidebarContent>
        <SidebarFooter>
          <TotalAmount>Total: ${total}</TotalAmount>
          <CheckoutButton to="/checkout" onClick={toggleSidebar}>
            Check Out
          </CheckoutButton>
          <ClearCartButton onClick={handleClearCart}>
            Clear Cart
          </ClearCartButton>
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

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const EmptyMessage = styled.p`
  text-align: center;
  color: white;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 2px solid #333;
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
  justify-content: space-around;
  align-items: center;
`;

const CartItemTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  color: white;
`;

const CartItemPrice = styled.p`
  margin: 0;
  font-size: 14px;
  color: white;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 18px;
`;

const SidebarFooter = styled.div`
  padding: 20px;
  border-top: 2px solid #333;
`;

const TotalAmount = styled.p`
  font-size: 18px;
  color: white;
  margin-bottom: 20px;
`;

const CheckoutButton = styled(Link)`
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #1f7fc4;
  color: white;
  text-align: center;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  margin-bottom: 10px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ClearCartButton = styled.button`
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;

const SkeletonCartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 2px solid #333;
`;

const SkeletonCartItemImage = styled.div`
  width: 60px;
  height: 60px;
  background-color: #ccc;
  margin-right: 10px;
`;

const SkeletonCartItemDetails = styled.div`
  flex-grow: 1;
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

export default ShoppingCartSidebar;
