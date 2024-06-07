import { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  useGetUserCartQuery,
  useClearCartMutation,
} from "../redux/features/sCart/sCartSlice";
import { useAddCourseToUserMutation } from "../redux/features/users/usersSlice";

const Checkout = () => {
  const { data: cartItems = [], isLoading, refetch } = useGetUserCartQuery();
  const [clearCart] = useClearCartMutation();
  const [addCourseToUser] = useAddCourseToUserMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && cartItems.length === 0) {
      refetch();
    }
  }, [isLoading, cartItems.length, refetch]);
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handlePayment = async () => {
    try {
      const courseIds = cartItems.map((item) => item.courseId);
      await addCourseToUser(courseIds).unwrap();
      await clearCart().unwrap();
      toast.success("Payment successful!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(
        "An error occurred during the payment process. Please try again."
      );
      console.error("Payment error:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <CheckoutContainer>
      <CartSummary>
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <CartItems>
            {cartItems.map((item) => (
              <CartItem key={item.courseId}>
                <img
                  src={item.image}
                  alt={item.courseName}
                  style={{ width: "auto", height: "70px" }}
                />
                <p>{item.title}</p>
                <p>${item.price}</p>
              </CartItem>
            ))}
            <CartItemTotal>
              <p>Total:</p>
              <p>${total}</p>
            </CartItemTotal>
          </CartItems>
        )}
      </CartSummary>
      <PaymentButton onClick={handlePayment}>Make Payment Now</PaymentButton>
    </CheckoutContainer>
  );
};

const CheckoutContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CartSummary = styled.div`
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
  background-color: #333;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CartItems = styled.div`
  margin-top: 20px;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;

  p {
    margin: 0;
  }

  img {
    margin-right: 10px;
  }
`;

const CartItemTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  font-weight: bold;
  border-top: 1px solid #ddd;
  margin-top: 10px;

  p {
    margin: 0;
  }
`;

const PaymentButton = styled.button`
  padding: 10px 20px;
  background-color: #1f7fc4;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;

  &:hover {
    background-color: #0056b3;
  }
`;

export default Checkout;
