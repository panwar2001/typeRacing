import React from "react";
import { NavbarContainer, StyledUl, StyledA } from "./NavbarStyled";
const navLinks = ["race", "pit stop", "chat", "about"];
const Navbar= () => (
  <NavbarContainer>
    <h3> ⌨ typeracer </h3>
    <StyledUl>
      {navLinks.map((link) => (
        <li key={link}>
          <StyledA href='#!'> {link} </StyledA>
        </li>
      ))}
    </StyledUl>
  </NavbarContainer>
);

export default Navbar;
