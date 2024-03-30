// Navbar.jsx

import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

const CustomNavbar = ({ onLogout }) => {
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-grey">
            <Container>
                <Navbar.Brand href="/">
                    TrashTracker
                </Navbar.Brand>
                <Navbar.Toggle
                    aria-controls="responsive-navbar-nav"
                    className="custom-toggler"
                    style={{ borderColor: 'white' }} //color of hamburger menu icon
                />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/#home">
                            Home
                        </Nav.Link>
                        <Nav.Link href="/#about">
                            About
                        </Nav.Link>
                        <NavDropdown title="Garbage Pickup" id="collapsible-nav-dropdown">
                            <NavDropdown.Item href="/request">Schedule Pickup</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/request/history">Pickup History</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/#contact">Contact Us</Nav.Link>
                        <Nav.Link href="/login" onClick={onLogout}>Logout</Nav.Link> {/* Call the onLogout function */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default CustomNavbar;
