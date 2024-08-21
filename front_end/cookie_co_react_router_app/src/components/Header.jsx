import React, { useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/esm/Button';
import { logOut, deleteUser } from '../utilities';

function Header({ user, setUser }) {

    const handleLogOutClick = async() => {
      setUser(await logOut())
    }
    
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            {user ? (
            <>
            <Navbar.Brand as={Link} to="/"></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                {/* <Nav.Link as={Link} to="/">Home</Nav.Link> */}
                <Nav.Link as={Link} to="/about">About</Nav.Link>
                <NavDropdown title="Creations" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/creations/favorites/">Favorites</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/creations/all/">Seller's Creations</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/creations/mine/">My Creations</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link as={Link} to="/makecreation/">Make Creation</Nav.Link>
                <NavDropdown title="Variations" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/variations/flavors/">Flavors</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/variations/cookiecutters/">Cookie Cutters</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/variations/toppings/">Toppings</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/variations/decorations/">Decorations</NavDropdown.Item>
                  {/* <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item> */}
                </NavDropdown> 
                <Button onClick={handleLogOutClick} variant="outline-danger">Log Out</Button>
              </Nav>
              <Button as={Link} to="/account/">Account Page</Button>
              <span>&nbsp;&nbsp;&nbsp;&nbsp;Logged in as: {user}</span>
            </Navbar.Collapse>
            </>
            ) : ( 
            <>
                <Nav.Link as={Link} to="/login/">Login</Nav.Link>
                <Nav.Link as={Link} to="/signup/">Sign-Up</Nav.Link>
            </>
            )}
          </Container>
        </Navbar>
      );
}

export default Header