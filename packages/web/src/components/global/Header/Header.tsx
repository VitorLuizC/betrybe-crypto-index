import React, { useCallback } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { useToken } from "../../../context/useToken";
import { Link } from "react-router-dom";

const Header = () => {
  const { token, revokeToken } = useToken();

  const handleButtonLogoutClick = useCallback(revokeToken, [revokeToken]);

  return (
    <Navbar bg="dark" expand="lg">
      <Navbar.Brand className="text-white">Bitcoin Index</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        {token !== null ? (
          <>
            <Nav className="mr-auto">
              <Link className="nav-link text-white" to="/currencies">
                Moedas
              </Link>

              <Link className="nav-link text-white" to="/update-currency">
                Atualizar moeda
              </Link>
            </Nav>
            <Nav>
              <Nav.Link href="#link">
                <Button onClick={handleButtonLogoutClick}>Sair</Button>
              </Nav.Link>
            </Nav>
          </>
        ) : null}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
