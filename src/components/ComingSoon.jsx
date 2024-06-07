import React from "react";
import styled from "styled-components";

const ComingSoon = () => {
  return (
    <ComingSoonContainer>
      <ComingSoonContent>
        <Title>Coming Soon</Title>
        <Message>
          We're working hard to bring you something amazing! Stay tuned.
        </Message>
      </ComingSoonContent>
    </ComingSoonContainer>
  );
};

const ComingSoonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #555;
  padding: 50px;
`;

const ComingSoonContent = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  margin-bottom: 30px;
  color: aliceblue;
  font-size: 3rem;
`;

const Message = styled.p`
  color: aliceblue;
  font-size: 1.5rem;
`;

export default ComingSoon;
