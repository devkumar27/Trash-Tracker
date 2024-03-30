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
            <h3 class="w3-center">TrashTracker</h3>
            <p class="w3-center w3-large">trash
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate asperiores culpa corrupti nostrum tempora a eius eligendi velit veniam voluptatum incidunt tempore accusantium molestias perferendis, saepe nam ipsa veritatis vitae adipisci. Officiis, labore voluptate?
            </p>
          </div>
          <div class="image-container">
            <img src="trash.jpg" alt="Image" />
          </div>
        </div>


        <div id="request">
          <p className="w3-center w3-large">
            Tired of dealing with garbage? Schedule a pickup hassle-free!
            Get your trash collected at the perfect time for you.
          </p>
          <Link to="/request">
            <button className="schedule-button">Schedule Now</button>
          </Link>
        </div>

        <div id="about" class="about-container">
          <div class="image-container">
            <img src="trash.jpg" alt="Image" />
          </div>
          <div class="text-container">
            <h3 class="w3-center">ABOUT THE COMPANY</h3>
            <p class="w3-center w3-large">Key features of our company
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque delectus repellat odio temporibus, doloribus harum consequuntur cum adipisci. Perspiciatis rerum error distinctio maiores. Soluta et eligendi veniam! Ullam molestiae, facere sapiente fugit officiis omnis aperiam cum placeat, ut quibusdam harum excepturi repellendus eius iste quisquam natus veritatis numquam rem eaque amet enim? Ratione dicta maxime exercitationem quis amet ipsam vitae, fugit aspernatur delectus, nemo maiores aperiam.
            </p>
          </div>
        </div>


        <div id="contact" class="contact-container">
          <div class="text-container">
            <h3 class="w3-center">Contact Us</h3>
            <p class="w3-center w3-large">Contact
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto soluta cum, veritatis repellat, nihil laboriosam maiores deserunt earum incidunt dolorum nemo ducimus doloribus tempora dignissimos aliquam libero magni rerum quaerat. Minus eaque dicta assumenda obcaecati rerum nulla possimus sint repellendus fugit! Distinctio numquam corporis ex.
            </p>
          </div>
          <div class="image-container">
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