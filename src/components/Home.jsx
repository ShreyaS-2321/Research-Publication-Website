import React from "react";
import { account } from "../../appwrite";
import background from "../assets/background.svg";
import profile from "../assets/profile.png"
import cv1 from "../assets/300image.jpg"
import trophy from "../assets/Trophy.svg";
import { Link } from "react-router-dom";

const Home = () => {

  const handleLogout = async () => {
    try {
      // Deletes the current session (logs out the user)
      await account.deleteSession("current");
      alert("You have been logged out successfully!");
      // Redirect to login page or clear any authenticated state
      window.location.href = "/Login"; // Update this to your login route
    } catch (error) {
      console.error("Error logging out:", error.message);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <div className=" bg-[#F5FBFF] min-h-screen font-sans flex-col">
      {/* header  */}
      <div className="h-16 bg-white flex justify-between items-center px-10">
          <h1 className="text-2xl font-semibold bg-[linear-gradient(to_right,_rgba(23,_40,_193,_1),_rgba(0,_109,_255,_1))] bg-clip-text text-transparent">InnoSphere</h1>
          <div className="flex gap-4">
          <img className="rounded-full h-[40px] w-[40px] object-contain border-2 border-blue-700" src={profile} alt="" />
          <button onClick={handleLogout} className="bg-red-600 rounded-md p-2 text-white">Logout</button>
          </div>
      </div>
      {/* Hero Section */}
      <div
        className=" text-white py-10 h-[450px] text-center relative"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-3xl font-bold font-montserrat py-4">
          DISCOVER, SHARE, INNOVATE
        </h1>
        <p className="text-lg mt-2 font-montserrat">
          EXPLORE A BOUNLESS COLLECTION OF
          <span className="font-bold font-montserrat text-yellow-400">
            {" "}
            DIVERSE
          </span>{" "}
          RESEARCH CONTRIBUTIONS
        </p>
        <div className="mt-6 flex justify-center">
          <input
            type="text"
            placeholder="Search.."
            className="w-1/2 px-4 py-2 rounded-md focus:outline-none text-black font-inter"
          />
        </div>
        <div className="mt-4">
          <button className="bg-yellow-500 text-white px-4 py-2 rounded-md font-inter">
            SEARCH
          </button>
        </div>
      </div>

      {/* Research Journey Section */}
      <div className="flex items-center justify-center">
        <div className="text-center py-12 bg-white w-[75%] rounded-md absolute shadow-md">
          <h2 className="text-xl font-semibold font-montserrat">
            EMBARK ON YOUR{" "}
            <span className="bg-[linear-gradient(to_right,_rgba(23,_40,_193,_1),_rgba(0,_109,_255,_1))] bg-clip-text text-transparent font-montserrat">
              RESEARCH
            </span>{" "}
            JOURNEY
          </h2>
          <div className="mt-4">
            <Link
              to="/Uploadform"
              className="bg-[linear-gradient(to_right,_rgba(23,_40,_193,_1),_rgba(0,_109,_255,_1))] text-white px-6 py-2 rounded-md font-inter"
            >
              UPLOAD
            </Link>
          </div>
        </div>
      </div>
      {/* Categories section */}
      <div className="w-full height-auto mt-40 flex items-center justify-center">
        <div className="w-[75%] flex items-center justify-center gap-10">
          <Link to={"/Allresearch"} className="w-[350px] h-auto p-12 bg-[linear-gradient(to_right,_rgba(23,_40,_193,_1),_rgba(0,_109,_255,_1))] rounded-md flex items-center justify-center gap-4 cursor-pointer hover:scale-105 transition duration-500 ease-out">
            <img src={trophy} alt="" />
            <h1 className="text-white font-montserrat font-semibold">
              ALL RESEARCH IDEAS
            </h1>
          </Link>
          <div className="w-[350px] h-auto p-12 bg-[linear-gradient(to_right,_rgba(23,_40,_193,_1),_rgba(0,_109,_255,_1))] rounded-md flex items-center justify-center gap-4 cursor-pointer hover:scale-105 transition duration-500 ease-out">
            <img src={trophy} alt="" />
            <h1 className="text-white font-montserrat font-semibold">
              TOP FUNDED PROJECTS
            </h1>
          </div>
          <div className="w-[350px] h-auto p-12 bg-[linear-gradient(to_right,_rgba(23,_40,_193,_1),_rgba(0,_109,_255,_1))] rounded-md flex items-center justify-center gap-4 cursor-pointer hover:scale-105 transition duration-500 ease-out">
            <img src={trophy} alt="" />
            <h1 className="text-white font-montserrat font-semibold">
              TOP FUNDED PROJECTS
            </h1>
          </div>
        </div>
      </div>

      {/* Featured Research Projects */}
      <div className="flex items-center justify-center">
        <div className="py-10 px-4 mt-10">
          <h2 className="text-xl font-semibold mb-12 text-center font-montserrat">
            FEATURED RESEARCH PROJECTS
          </h2>
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-10">
            {[1, 2, 3].map((item, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-4 text-center w-[350px]"
              >
                <img
                  src={cv1}
                  alt="Robot"
                  className="mx-auto mb-4 w-full h-40 object-fill rounded-md"
                />
                <h3 className="text-lg font-bold">ROBOMIND</h3>
                <p className="text-gray-600 text-sm">
                  AUTONOMOUS AI FOR ROBOTICS
                </p>
                <div className="mt-4 flex justify-between text-black text-base">
                  <div>
                    <p>Priyanka Singh</p>
                  </div>
                  <div className=" flex justify-between gap-2">
                    <div>200</div>
                    <div>1000</div>
                  </div>
                </div>
                <div className="mt-4 flex justify-center">
                  <button className="bg-[linear-gradient(to_right,_rgba(23,_40,_193,_1),_rgba(0,_109,_255,_1))] text-white px-4 py-2 rounded-md font-inter w-full">
                    VIEW
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Research Events */}
      <div className="py-10 px-4">
        <h2 className="text-xl font-semibold mb-12 text-center font-montserrat">
          UPCOMING RESEARCH EVENTS
        </h2>
        <div className="flex items-center justify-center">
          <div className="space-y-6 w-[90%]">
            {[1, 2].map((item, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between"
              >
                <div className="flex items-center">
                  <div className="bg-[linear-gradient(to_right,_rgba(23,_40,_193,_1),_rgba(0,_109,_255,_1))] text-white text-center py-4 px-6 rounded-md">
                    <h3 className="text-lg font-bold font-inter">27</h3>
                    <p className="text-sm font-inter">AUG</p>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-lg font-inter">
                      2024 IEEE CONFERENCE ON CONTROL TECHNOLOGY AND
                      APPLICATIONS
                    </h3>
                    <p className="text-gray-600 text-sm font-inter">
                      RUNS FROM 27 - 30 AUGUST | GOOGLE MEET
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-red-500 text-sm mb-2 font-inter">
                    Registration ends on 22 August
                  </p>
                  <div className="flex space-x-2">
                    <button className="bg-white text-black px-4 py-1 border-2 border-blue-700 rounded-md p-4 font-inter">
                      SAVE
                    </button>
                    <button className="bg-[linear-gradient(to_right,_rgba(23,_40,_193,_1),_rgba(0,_109,_255,_1))] text-white px-4 py-1 rounded-md font-inter">
                      REGISTER
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 text-center">
          <button className="bg-[linear-gradient(to_right,_rgba(23,_40,_193,_1),_rgba(0,_109,_255,_1))] text-white px-6 py-2 rounded-md font-inter">
            SEE ALL UPCOMING EVENTS
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
