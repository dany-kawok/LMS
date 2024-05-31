/* eslint-disable react/prop-types */
import styled from "styled-components";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  useRegisterAPIMutation,
  useLoginAPIMutation,
} from "../redux/features/auth/authApiSlice";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { login } from "../redux/features/auth/authSlice"; // Import the login action
import { toast } from "react-hot-toast";
const Form = ({ action }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordShow, setPasswordShow] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);

  const signUpSchema = z
    .object({
      first_name: z.string().min(1, { message: "First Name is required" }),
      last_name: z.string().min(1, { message: "Last Name is required" }),
      email: z
        .string()
        .min(1, { message: "Email is required" })
        .email({ message: "Invalid email format" }),
      password: z.string().min(6, { message: "Minimum 6 characters required" }),
      confirmPassword: z
        .string()
        .min(6, { message: "Minimum 6 characters required" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const loginSchema = z.object({
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email format" }),
    password: z.string().min(5, { message: "Minimum 5 characters required" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(action === "signup" ? signUpSchema : loginSchema),
  });

  const [
    registerAPI,
    {
      isLoading: registerIsLoading,
      // isError: registerIsError,
      // isSuccess: registerIsSccess,
      // error: registerError,
    },
  ] = useRegisterAPIMutation();
  const [
    loginAPI,
    {
      isLoading: loginIsLoading,
      data,
      // isError: loginIsError,
      // isSuccess: loginIsSccess,
      // error: loginError,
    },
  ] = useLoginAPIMutation();

  const onSubmit = async (formData) => {
    try {
      if (action === "signup") {
        const { data } = await registerAPI(formData);
        const accessToken = data.data.accessToken;
        if (accessToken) {
          Cookies.set("accessToken", accessToken);
          dispatch(login());
          toast.success("Signed up successfully!");

          navigate("/");
        }
      } else if (action === "login") {
        const { data } = await loginAPI(formData);
        const accessToken = data.data.accessToken;
        if (accessToken) {
          Cookies.set("accessToken", accessToken);
          dispatch(login());
          toast.success("Signed in successfully!");

          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        {action === "signup" && (
          <>
            <FirstName
              type="text"
              placeholder="Enter your first name"
              {...register("first_name", { required: true })}
            />
            {errors.first_name && (
              <ErrorMessage>{errors.first_name.message}</ErrorMessage>
            )}
            <LastName
              type="text"
              placeholder="Enter your last name"
              {...register("last_name", { required: true })}
            />
            {errors.last_name && (
              <ErrorMessage>{errors.last_name.message}</ErrorMessage>
            )}
          </>
        )}
        <Email
          type="text"
          placeholder="Enter your email"
          {...register("email", { required: true })}
          autoComplete="off"
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

        <PasswordContainer>
          <Password
            type={passwordShow ? "text" : "password"}
            placeholder="Enter your password"
            {...register("password", { required: true })}
            autoComplete="off"
          />
          <PasswordToggle onClick={() => setPasswordShow(!passwordShow)}>
            {passwordShow ? <FaEyeSlash /> : <FaEye />}
          </PasswordToggle>
        </PasswordContainer>
        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}

        {action === "signup" && (
          <PasswordContainer>
            <ConfirmPassword
              type={confirmPasswordShow ? "text" : "password"}
              placeholder="Confirm your password"
              {...register("confirmPassword", { required: true })}
              autoComplete="off"
            />
            <PasswordToggle
              onClick={() => setConfirmPasswordShow(!confirmPasswordShow)}
            >
              {confirmPasswordShow ? <FaEyeSlash /> : <FaEye />}
            </PasswordToggle>
          </PasswordContainer>
        )}
        {errors.confirmPassword && (
          <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
        )}
        {console.log(loginIsLoading)}
        <SubmitBtn disabled={loginIsLoading || registerIsLoading}>
          {loginIsLoading || registerIsLoading
            ? "Processing..."
            : action === "login"
            ? "Sign In"
            : "Sign Up"}
        </SubmitBtn>
      </FormContainer>

      <MemberOrNot>
        {action === "signup" ? (
          <span>
            Already a member?{" "}
            <Link
              to="/auth/login"
              onClick={() => {
                reset();
              }}
            >
              Sign In
            </Link>
          </span>
        ) : (
          <span>
            Not a member yet?{" "}
            <Link
              to="/auth/signup"
              onClick={() => {
                reset();
              }}
            >
              Sign Up
            </Link>
          </span>
        )}
      </MemberOrNot>
    </>
  );
};

const FormContainer = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
  width: 85%; /* Initially set to 75% */
  @media (min-width: 768px) {
    width: 70%; /* For screens wider than 768px */
  }
`;

const PasswordContainer = styled.div`
  position: relative;
  width: 100%;
`;

const Password = styled.input`
  padding: 7px;
  width: 100%;
  color: white;
  background-color: #282828;
  border-radius: 5px;
  border: none;
  outline: none;
  &::placeholder {
    color: #a3a3a3;
  }
  &:focus {
    background-color: #333;
  }
`;

const PasswordToggle = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
  color: #1f7fc4;
`;

const SharedFormStyles = `
  padding: 7px;
  width: 100%;
  color: white;
  background-color: #282828;
  border-radius: 5px;
`;

const FirstName = styled.input`
  ${SharedFormStyles}
`;

const LastName = styled.input`
  ${SharedFormStyles}
`;

const Email = styled.input`
  ${SharedFormStyles}
`;

const ConfirmPassword = styled.input`
  ${SharedFormStyles}
`;

const SubmitBtn = styled.button`
  background-color: #1f7fc4;
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  cursor: pointer;
`;

const MemberOrNot = styled.div`
  margin-top: 12px;

  span {
    color: #1f7fc4;
    font-weight: bold;

    a {
      margin-left: 10px;
      ${SharedFormStyles}
      width: 100%;
      text-align: center;
    }
  }
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 0.7rem;
`;

export default Form;
