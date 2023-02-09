import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <Container>
      <Navbar expand="lg" variant="light" bg="light">
        <Container>
          <Navbar.Brand>Home</Navbar.Brand>
          <Navbar.Brand href="#">My Bets</Navbar.Brand>
          <Navbar.Brand href="#">Logout</Navbar.Brand>
        </Container>
      </Navbar>
    </Container>
  );
}
