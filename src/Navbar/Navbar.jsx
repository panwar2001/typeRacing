import React from "react";
import { NavbarContainer, StyledUl, StyledA } from "./NavbarStyled";
const navLinks = ["quit","switch to another game"];
const Navbar= () => (
  <div style={{ display: "flex", justifyContent: "center" }}>
  <NavbarContainer>
    <h3> ⌨ typeRacing </h3>
    <StyledUl>
      {navLinks.map((link) => (
        <li key={link}>
          <StyledA href='/'> {link} </StyledA>
        </li>
      ))}
    </StyledUl>
  </NavbarContainer>
    </div>
);

export default Navbar;
