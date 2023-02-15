import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link, useLocation } from "react-router-dom";

export default function NavBar() {
  const location = useLocation();

  return (
    <Container>
      <Navbar expand="lg" variant="light" bg="light">
        <Container>
          {location.pathname === "/" ? null : (
            <Link className="nav-link" to="/">
              <Navbar.Brand>Home</Navbar.Brand>
            </Link>
          )}
          {location.pathname === "/my-bets" ? null : (
            <Link className="myBets-link" to="/my-bets">
              <Navbar.Brand>My Bets</Navbar.Brand>
            </Link>
          )}
          <Link className="out-link" to="/out">
            <Navbar.Brand>Logout</Navbar.Brand>
          </Link>
        </Container>
      </Navbar>
    </Container>
  );
}
