import styled from "styled-components";

export const NavbarContainer = styled.div`
  width: 97%;
  height: 80px;
  border-radius: 20px;
  background-color: #36454f;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
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
  color: white;
  text-decoration: none;
  transition: color 0.3s;
  :hover {
    cursor: pointer;
    color: black;
    text-decoration: none;
  }
`;
