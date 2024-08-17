import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from "react-router-dom"

function Header() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand as={Link} to="/">Care and Sky Cookie Co</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/about">About</Nav.Link>
                <NavDropdown title="Creations" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/creations/favorites">Favorites</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/creations/all">All Creations</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/creations/mine">My Creations</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/creations/make">Make Creation</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Variations" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/variations/flavors">Flavors</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/variations/cookiecutters">Cookie Cutters</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/variations/toppings">Toppings</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/variations/decorations">Decorations</NavDropdown.Item>
                  {/* <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item> */}
                </NavDropdown>
                <Nav.Link href="#login">Login</Nav.Link>
                <Nav.Link href="#home"></Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
}

export default Header