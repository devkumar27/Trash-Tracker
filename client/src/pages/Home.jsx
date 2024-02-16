import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
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
        <div class="topnav">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <a href=" " onClick={Logout}>Logout</a>
          {/* <button onClick={Logout}>Logout</button> */}
        </div>
        
        <div id="home">
          <h3 class="w3-center">TrashTracker</h3>
          <p class="w3-center w3-large">trash</p>
        </div>

        <div id="about">
          <h3 class="w3-center">ABOUT THE COMPANY</h3>
          <p class="w3-center w3-large">Key features of our company</p>
        </div>

        <div id="contact">
          <h3 class="w3-center">Contact Us</h3>
          <p class="w3-center w3-large">Contact</p>
        </div>

        {/* <footer class="w3-center w3-black w3-padding-64">
          <a href="#home" class="w3-button w3-light-grey"><i class="fa fa-arrow-up w3-margin-right"></i>To the top</a></footer> */}
      </div>
    </>
  );
};

export default Home;