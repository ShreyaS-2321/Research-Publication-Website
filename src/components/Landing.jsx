import React from "react";
import logo from "../assets/logo.svg";
import rocket from "../assets/rocket.svg"
import about from "../assets/About.svg"

function Landing() {
  return (
    <div className="bg-[#F5FBFF] min-h-screen">
      {/* Navbar */}
      <div className="h-20 bg-white flex justify-between items-center px-10 shadow-sm">
        <img src={logo} alt="" />
        <div className="flex gap-4">
          <button className=" text-black border-2 border-blue-700 rounded-md p-2 font-inter">
            Login
          </button>
          <button className="bg-[linear-gradient(to_right,_rgba(23,_40,_193,_1),_rgba(0,_109,_255,_1))] rounded-md p-2 text-white font-inter">
            Signup
          </button>
        </div>
      </div>
      {/* Hero section */}
      <div className="mt-16 flex justify-between px-16">
        <div className=" flex-col px-16 py-10 w-[50%]">
            <h1 className="font-montserrat mb-12 text-5xl font-semibold ">Fueling <span className="bg-[linear-gradient(to_right,_rgba(23,_40,_193,_1),_rgba(0,_109,_255,_1))] bg-clip-text text-transparent">Innovation,</span> Empowering <span className="bg-[linear-gradient(to_right,_rgba(23,_40,_193,_1),_rgba(0,_109,_255,_1))] bg-clip-text text-transparent">Research</span></h1>
            <h4 className="font -inter text-xl mb-12">A dynamic platform where students and researchers can publish their ideas, collaborate with experts, and gain visibility. Whether you’re showcasing groundbreaking research or exploring cutting-edge projects, InnoSphere is your gateway to innovation and discovery.</h4>
            <button className="bg-[linear-gradient(to_right,_rgba(23,_40,_193,_1),_rgba(0,_109,_255,_1))] text-white rounded-md px-6 py-4 w-full text-lg font-semibold font-inter">Start Your Innovation Journey🎯</button>
        </div>
        <div><img src={rocket} alt="" /></div>
      </div>
      {/* About section */}
      <div className="mt-10 px-16">
      <h1 className="text-center mb-2 font-montserrat text-3xl font-semibold">About InnoSphere</h1>
      <div className="mt-16 flex justify-between px-16 items-center">
      <div><img src={about} alt="" /></div>
        <div className=" flex-col px-16 py-10 w-[50%] items-center">
            <h4 className="font -inter text-xl mb-12">InnoSphere is a dynamic research publication platform designed to help students and researchers showcase their ideas, collaborate, and gain recognition. Whether you're an aspiring innovator, a seasoned researcher, or someone looking to explore groundbreaking projects, InnoSphere is the perfect place for you!</h4>
        </div>
      </div>
      </div>
      {/* Features section */}
      <div className="mt-16 px-16">
      <h1 className="text-center mb-2 font-montserrat text-3xl font-semibold">Why InnoSphere?</h1>
      <div className=" flex justify-center gap-16 mt-10 px-10">
        <div className="w-[300px] h-[200px] bg-white rounded-md"></div>
        <div className="w-[300px] h-[200px] bg-white rounded-md"></div>
        <div className="w-[300px] h-[200px] bg-white rounded-md"></div>
        <div className="w-[300px] h-[200px] bg-white rounded-md"></div>
      </div>
      </div>
    </div>
  );
}

export default Landing;
