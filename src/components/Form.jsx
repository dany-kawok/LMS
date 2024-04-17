/* eslint-disable react/prop-types */
import styled from "styled-components";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const Form = ({ action }) => {
  const [passwordShow, setPasswordShow] = useState(false);
  const signUpSchema = z
    .object({
      email: z
        .string()
        .min(1, { message: "Email is required" })
        .email({ message: "Need valid email" }),
      password: z.string().min(6, { message: "Minimum 6 letters long" }),
      confirmPassword: z.string().min(6, { message: "Minimum 6 letters long" }),
    })
    .refine(
      (data) => {
        console.log(data);
        return data.password === data.confirmPassword;
      },
      {
        message: "Passwords not matching",
        path: ["confirmPassword"],
      }
    );
  const loginSchema = z.object({
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Need valid email" }),
    password: z.string().min(6, { message: "Minimum 6 letters long" }),
  });

  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(action === "signup" ? signUpSchema : loginSchema),
  });
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <Email
          type="text"
          placeholder="Enter your email"
          {...register("email", { required: true })}
        />

        {errors.email && (
          <span style={{ color: "red" }}>{errors.email.message}</span>
        )}

        <PasswordContainer>
          <Password
            type={passwordShow ? "text" : "password"}
            placeholder="Enter your password"
            {...register("password", { required: true })}
          />

          {passwordShow ? (
            <FaEyeSlash
              style={{
                fontSize: "1.2rem",
                position: "absolute",
                right: "60px",
                top: "50%",
                transform: "translate(-50%, -50%)",
                cursor: "pointer",
              }}
              onClick={() => setPasswordShow(!passwordShow)}
            />
          ) : (
            <FaEye
              style={{
                fontSize: "1.2rem",
                position: "absolute",
                right: "60px",
                top: "50%",
                transform: "translate(-50%, -50%)",
                cursor: "pointer",
              }}
              onClick={() => setPasswordShow(!passwordShow)}
            />
          )}
        </PasswordContainer>
        {errors.password && (
          <span style={{ color: "red" }}>{errors.password.message}</span>
        )}
        {action === "signup" ? (
          <PasswordContainer>
            <ConfirmPassword
              type={confirmPasswordShow ? "text" : "password"}
              placeholder="Confirm your password"
              {...register("confirmPassword", { required: true })}
            />

            {confirmPasswordShow ? (
              <FaEyeSlash
                style={{
                  fontSize: "1.2rem",
                  position: "absolute",
                  right: "60px",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  cursor: "pointer",
                }}
                onClick={() => setConfirmPasswordShow(!confirmPasswordShow)}
              />
            ) : (
              <FaEye
                style={{
                  fontSize: "1.2rem",
                  position: "absolute",
                  right: "60px",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  cursor: "pointer",
                }}
                onClick={() => setConfirmPasswordShow(!confirmPasswordShow)}
              />
            )}
          </PasswordContainer>
        ) : null}
        {errors.confirmPassword && (
          <span style={{ color: "red" }}>{errors.confirmPassword.message}</span>
        )}

        <SubmitBtn>{action === "login" ? "Sign In" : "Sign Up"}</SubmitBtn>
      </FormContainer>
      <MemberOrNot>
        {action === "signup" ? (
          <>
            <span>Already member to HD Movies?</span>
            <Link to="/auth/login">Sign In</Link>
          </>
        ) : (
          <>
            <span>Become member to HD Movies now!</span>
            <Link to="/auth/signup">Sign Up</Link>
          </>
        )}
      </MemberOrNot>
    </>
  );
};

const FormContainer = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  flex-direction: column;
`;
const PasswordContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
`;
const SharedFormStyles = `padding: 10px;
width: 70%;
color: white;
background-color: #282828;
border-radius: 5px;`;
const Email = styled.input`
  ${SharedFormStyles}
`;
const Password = styled.input`
  ${SharedFormStyles}
`;
const ConfirmPassword = styled.input`
  ${SharedFormStyles}
`;
const SubmitBtn = styled.button`
  background-color: red;
  width: 70%;
  padding: 10px;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  cursor: pointer;
`;
const MemberOrNot = styled.div`
  margin-top: 12px;

  a {
    margin-left: 10px;
    color: red;
    font-weight: bold;
  }
`;
export default Form;
