import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCookies } from "react-cookie";
import axios from "axios";
import CustomNavbar from './Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      const { data } = await axios.post(
        "http://localhost:4000",
        {},
        { withCredentials: true }
      );
      const { status, user } = data;
      // setUsername(user);
      return status
        ? console.log("hey")
        : (removeCookie("token"), navigate("/login"));
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);
  const Logout = () => {
    removeCookie("token");
    navigate("/login");
  };
  return (
    <>
      <div className="home_page">
        <CustomNavbar onLogout={Logout} />
        {/* <div class="topnav">
          <div className="navbar-left">
            <p className="website-name">Trash-Tracker</p>
          </div>
          <div className="navbar-right">
            <a href="#home">Home</a>
            <a href="/request">Request Pickup</a>
            <a href="#about">About</a>
            <a href="/request/history">History</a>
            <a href="#contact">Contact</a>
            <a href=" " onClick={Logout}>Logout</a>
          </div>
        </div> */}

        {/* <Navbar collapseOnSelect expand="lg"
          className="bg-grey">
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
                <Nav.Link href="#home">
                  Home
                </Nav.Link>
                <Nav.Link href="#about">
                  About
                </Nav.Link>
                <NavDropdown title="Garbage Pickup"
                  id="collapsible-nav-dropdown">
                  <NavDropdown.Item href="/request">
                    Schedule Pickup
                  </NavDropdown.Item>

                  {/* <NavDropdown.Item href="#action/3.2">
                    x
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    y
                  </NavDropdown.Item> */}

        {/* <NavDropdown.Divider />

                  <NavDropdown.Item href="/request/history">
                    Pickup History
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav>
                <Nav.Link href="#contact">
                  Contact Us
                </Nav.Link>
                <Nav.Link href=" " onClick={Logout}>
                  Logout
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar> */}

        <div id="home" class="home-container">
          <div class="text-container">
            <h3 class="w3-center">TRASHTRACKER</h3>
            <p class="w3-center w3-large">
              Welcome to Trash-Tracker, your solution to the pressing challenge of inadequate waste disposal in urban areas. Say goodbye to environmental contamination, health risks, and compromised living standards. Our platform tackles these issues head-on, offering efficient waste management solutions tailored to your needs. Experience the ease of streamlined garbage disposal with features like time slot-based pickups and intuitive waste categorization. Join us in creating cleaner, healthier communities one step at a time.
            </p>
          </div>
          <div class="image-container">
            <img src="trash.jpg" alt="Image" />
          </div>
        </div>


        <div id="request">
          <p className="w3-center w3-large">
            Choose us for seamless doorstep waste collection, transparent processes, and a commitment to sustainability for a cleaner future.
          </p>
          <Link to="/request">
            <button className="schedule-button">Request Pickup</button>
          </Link>
        </div>

        <div id="about" class="about-container">
          <div class="image-container">
            <img src="aboutus.jpg" alt="Image" />
          </div>
          <div class="text-container">
            <h3 class="w3-center">ABOUT US</h3>
            <p class="w3-center w3-large">
              Urban regions are contending with the issue of inadequate waste disposal, resulting in environmental contamination, health risks, and a deterioration in living standards. Current waste management systems frequently exhibit inefficiency and struggle to offer residents a smooth process for disposing of their household waste.
              <br />
              TrashTracker is dedicated to addressing the challenge of improper garbage disposal in urban areas by offering innovative solutions such as time slot-based garbage pickup and efficient categorization of waste.
            </p>
          </div>
        </div>


        <div id="contact" className="contact-container">
          <div className="text-container">
            <h3 className="w3-center">CONTACT US</h3>
            <p className="w3-center w3-large">Phone: +1 (123) 456-7890</p>
            <p className="w3-center w3-large">Email: contact@trashtracker.com</p>
          </div>
          <div className="image-container">
            <img src="contact.png" alt="Image" />
          </div>
        </div>

        {/*<footer class="w3-center w3-padding-64">
          <a href="#home" class="w3-button"><i class="fa fa-arrow-up w3-margin-right"></i>To the top</a></footer>*/}
      </div>
    </>
  );
};

export default Home;