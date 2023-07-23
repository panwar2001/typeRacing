import styled from "styled-components";

export const NavbarContainer = styled.div`
  width: 95%;
  height: 80px;
  border-radius: 20px;
  background-color: #181b1f;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #f0f6fc;
  margin-top: 5px;
`;
export const StyledUl = styled.ul`
  list-style: none;
  width: 50%;
  display: flex;
  justify-content: space-evenly;
  text-transform: capitalize;
  font-size: 20px;
`;
export const StyledA = styled.a`
  color: #f0f6fc;
  text-decoration: none;
  transition: color 0.3s;
  :hover {
    cursor: pointer;
    color: #b4bbc2;
    text-decoration: none;
  }
`;
