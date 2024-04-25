// adminNavbar.jsx

import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

const adminNavbar = ({ onLogout }) => {
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-grey">
            <Container>
                <Navbar.Brand>
                    TrashTracker
                </Navbar.Brand>

                <Nav className="ms-auto">
                    <Nav.Link href="/login" onClick={onLogout}>Logout</Nav.Link> {/* Call the onLogout function */}
                </Nav>

            </Container>
        </Navbar>
    );
}

export default adminNavbar;
