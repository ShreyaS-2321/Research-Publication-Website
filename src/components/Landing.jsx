import React from "react";
import logo from "../assets/logo.svg";
import rocket from "../assets/rocket.svg";
import about from "../assets/About.svg";
import background from "../assets/background.svg";
import trophy from "../assets/Trophy.svg";
import rocketsm from "../assets/rocketsm.svg";
import magnifying from "../assets/magnifying.svg";
import handshake from "../assets/handshake.svg";
import contact from "../assets/contact.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className="bg-[#F5FBFF] min-h-screen">
      {/* Navbar */}
      <div className="h-20 bg-white flex justify-between items-center px-10 shadow-sm">
        <img src={logo} alt="" />
        <nav className="flex gap-8 font-inter font-medium">
          <a
            href="#home"
            className="text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700"
          >
            Home
          </a>
          <a
            href="#about"
            className="text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
          >
            About Us
          </a>
          <a
            href="#features"
            className="text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
          >
            Our Features
          </a>
          <a
            href="#contact"
            className="text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700"
          >
            Contact Us
          </a>
        </nav>
        <div className="flex gap-4">
          <Link to="/Login" className=" text-black border-2 border-blue-700 rounded-md p-2 font-inter">
            Login
          </Link>
          <Link to="/Signup" className="bg-[linear-gradient(to_right,_rgba(23,_40,_193,_1),_rgba(0,_109,_255,_1))] rounded-md p-2 text-white font-inter">
            Signup
          </Link>
        </div>
      </div>
      {/* Hero section */}
      <div id="home" className="mt-16 flex justify-between px-16">
        <div className=" flex-col px-16 py-10 w-[50%]">
          <h1 className="font-montserrat mb-12 text-5xl font-semibold ">
            Fueling{" "}
            <span className="bg-[linear-gradient(to_right,_rgba(23,_40,_193,_1),_rgba(0,_109,_255,_1))] bg-clip-text text-transparent">
              Innovation,
            </span>{" "}
            Empowering{" "}
            <span className="bg-[linear-gradient(to_right,_rgba(23,_40,_193,_1),_rgba(0,_109,_255,_1))] bg-clip-text text-transparent">
              Research
            </span>
          </h1>
          <h4 className="font -inter text-xl mb-12">
            A dynamic platform where students and researchers can publish their
            ideas, collaborate with experts, and gain visibility. Whether you’re
            showcasing groundbreaking research or exploring cutting-edge
            projects, InnoSphere is your gateway to innovation and discovery.
          </h4>
          <Link to="/Signup" className=" w-full bg-[linear-gradient(to_right,_rgba(23,_40,_193,_1),_rgba(0,_109,_255,_1))] text-white rounded-md px-6 py-4 text-lg font-semibold font-inter">
            Start Your Innovation Journey🎯
          </Link>
        </div>
        <div>
          <img src={rocket} alt="" />
        </div>
      </div>
      {/* About section */}
      <div id="about" className="mt-10 px-16">
        <h1 className="text-center mb-2 font-montserrat text-3xl font-semibold text-blue-700">
          About InnoSphere
        </h1>
        <div className="mt-16 flex justify-between px-16 items-center">
          <div>
            <img src={about} alt="" />
          </div>
          <div className=" flex-col px-16 py-10 w-[50%] items-center">
            <h4 className="font -inter text-xl mb-12">
              InnoSphere is a dynamic research publication platform designed to
              help students and researchers showcase their ideas, collaborate,
              and gain recognition. Whether you're an aspiring innovator, a
              seasoned researcher, or someone looking to explore groundbreaking
              projects, InnoSphere is the perfect place for you!
            </h4>
          </div>
        </div>
      </div>
      {/* Features section */}
      <div
        id="features"
        className="mt-16 p-16 h-auto flex-col justify-center items-center"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-center font-montserrat text-3xl font-semibold text-white">
          Why InnoSphere?
        </h1>
        <div className=" flex justify-center gap-16 mt-10 px-10">
          <div className="flex-col justify-items-center w-[300px] h-auto bg-white rounded-md px-8 py-8 hover:scale-105 transition duration-500 ease-out">
            <img src={rocketsm} alt="" />
            <h2 className="mt-4 w-full text-lg mb-1 font-montserrat font-bold text-center text-blue-700">
              Easy Project Upload
            </h2>
            <p className="font-inter font-semibold text-center">
              Share your research effortlessly
            </p>
          </div>
          <div className="flex-col justify-items-center w-[300px] h-auto bg-white rounded-md px-8 py-8 hover:scale-105 transition duration-500 ease-out">
            <img src={magnifying} alt="" />
            <h2 className="mt-4 w-full text-lg mb-1 font-montserrat font-bold text-center text-blue-700">
              {" "}
              Explore & Discover
            </h2>
            <p className="font-inter font-semibold text-center">
              Find projects in various fields
            </p>
          </div>
          <div className="flex-col justify-items-center w-[300px] h-auto bg-white rounded-md px-8 py-8 hover:scale-105 transition duration-500 ease-out">
            <img src={handshake} alt="" />
            <h2 className="mt-4 w-full text-lg mb-1 font-montserrat font-bold text-center text-blue-700">
              Collaborate & Connect
            </h2>
            <p className="font-inter font-semibold text-center">
              Share your research effortlessly
            </p>
          </div>
          <div className="flex-col justify-items-center w-[300px] h-auto bg-white rounded-md px-8 py-8 hover:scale-105 transition duration-500 ease-out">
            <img src={trophy} alt="" />
            <h2 className="mt-4 w-full text-lg mb-1 font-montserrat font-bold text-center text-blue-700">
              Get Recognized
            </h2>
            <p className="font-inter font-semibold text-center">
              Gain visibility and attract opportunities
            </p>
          </div>
        </div>
      </div>
      {/* Contact Us */}
      <div id="contact" className="h-auto px-16">
        <h1 className=" mt-16 text-center font-montserrat text-3xl font-semibold text-blue-700">
          Contact Us
        </h1>
        <div className="flex justify-between items-center">
          <div className="w-[50%] p-6">
            <form>
              <div className="mb-4">
                <label className="block font-medium mb-1 font-inter">
                  Enter Your Name
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 p-2 rounded-md outline-blue-700 font-inter"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-1 font-inter">
                  Enter Your Email
                </label>
                <input
                  type="text"
                  placeholder="user@gmail.com"
                  className="w-full border border-gray-300 p-2 rounded-md outline-blue-700 font-inter"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-1 font-inter">
                  Enter Your Message
                </label>
                <textarea
                  rows="4"
                  maxlenth="200"
                  type="text"
                  placeholder="message..."
                  className="w-full border border-gray-300 p-2 rounded-md outline-blue-700 font-inter"
                />
              </div>
              <div className="mb-4">
                <button className="bg-[linear-gradient(to_right,_rgba(23,_40,_193,_1),_rgba(0,_109,_255,_1))] text-white rounded-md px-6 py-2 w-full text-lg font-semibold font-inter">
                  Send
                </button>
              </div>
            </form>
          </div>
          <div className="flex justify-center items-center w-[40%]">
            <img src={contact} alt="" />
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="w-full flex items-center justify-center bg-white h-auto">
        <h1 className="p-4 text-center font-medium">
          Made with <FontAwesomeIcon icon={faHeart} className="text-red-600" />{" "}
          <span> </span> by Shreya
        </h1>
      </div>
    </div>
  );
}

export default Landing;
