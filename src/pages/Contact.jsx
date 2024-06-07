import React, { useState } from "react";
import styled from "styled-components";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you can add form submission logic (e.g., send data to an API)
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <ContactContainer>
      <ContactTitle>Contact Us</ContactTitle>
      <ContactForm onSubmit={handleSubmit}>
        <FormField>
          <FormLabel htmlFor="name">Name</FormLabel>
          <FormInput
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </FormField>
        <FormField>
          <FormLabel htmlFor="email">Email</FormLabel>
          <FormInput
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </FormField>
        <FormField>
          <FormLabel htmlFor="subject">Subject</FormLabel>
          <FormInput
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </FormField>
        <FormField>
          <FormLabel htmlFor="message">Message</FormLabel>
          <FormTextarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </FormField>
        <SubmitButton type="submit">Submit</SubmitButton>
      </ContactForm>
    </ContactContainer>
  );
};

const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  background-color: #555;
`;

const ContactTitle = styled.h2`
  margin-bottom: 30px;
  color: aliceblue;
`;

const ContactForm = styled.form`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
`;

const FormField = styled.div`
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  color: aliceblue;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
  min-height: 100px;
`;

const SubmitButton = styled.button`
  padding: 15px 20px;
  font-size: 16px;
  color: white;
  background-color: #333;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #1f7fc4;
  }
`;

export default Contact;
