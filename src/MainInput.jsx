import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  width: 100%;
  margin-top: 10px;
  font-size: 1.15rem;
  background-color: "white"
`;

const MainInput = ({
  inputValue='',
}) => {
  return (
    <StyledInput
      type='text'
      className='mb-2'
      placeholder='Type the above text here when the race begins'
      value={inputValue}
      autoFocus
    />
  );
};

export default MainInput;
