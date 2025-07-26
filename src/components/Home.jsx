import React, { useEffect, useState } from "react";
import { account, databases } from "../../appwrite";
import background from "../assets/background.svg";
import profile from "../assets/profile.png"
import trophy from "../assets/Trophy.svg";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const [researchProjects, setResearchProjects] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [userActions, setUserActions] = useState({}); // Store likes for each project
  const [currentUserID, setCurrentUserID] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
          try {
            const accountInfo = await account.get();
            setCurrentUserID(accountInfo.$id);
          } catch (err) {
            console.error('Error fetching current user:', err);
          }
        };
    
        fetchCurrentUser();
      }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await databases.listDocuments(
          "679549870000eafd23e3", // Database ID
          "679549a900198ab41a28"  // Collection ID
        );

        if (result.documents.length === 0) {
          setError("No research projects available.");
        }

        const researchData = result.documents.map((item) => {
          if (item && typeof item === "object") {
            return {
              ...item,
              likes: item.likedByUser?.length || 0,
              views: item.views || 0,
              likedByUser: item.likedByUser || [],
            };
          }
          return {};
        });

        setResearchProjects(researchData);

        const initialActions = {};
        researchData.forEach((project) => {
          initialActions[project.$id] = {
            liked: project.likedByUser.includes(currentUserID) // Check if the current user liked it
          };
        });
        setUserActions(initialActions);
      } catch (err) {
        console.error("Error fetching research data:", err);
        setError("Failed to fetch research projects.");
      } finally {
        // setLoading(false);
      }
    };

    if (currentUserID) {
      fetchData();
    }
  }, [currentUserID]);

  const handleLike = async (projectId, currentLikes, likedByUser) => {
    const isLiked = userActions[projectId]?.liked || false;

    try {
      setResearchProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.$id === projectId
            ? {
                ...project,
                likes: isLiked ? project.likes - 1 : project.likes + 1,
                likedByUser: isLiked
                  ? project.likedByUser.filter((user) => user !== currentUserID)
                  : [...project.likedByUser, currentUserID]
              }
            : project
        )
      );

      // Toggle like status
      setUserActions((prevActions) => ({
        ...prevActions,
        [projectId]: { ...prevActions[projectId], liked: !isLiked },
      }));

      await databases.updateDocument(
        "679549870000eafd23e3",
        "679549a900198ab41a28",
        projectId,
        {
          likes: isLiked ? currentLikes - 1 : currentLikes + 1,
          likedByUser: isLiked
            ? likedByUser.filter((user) => user !== currentUserID)
            : [...likedByUser, currentUserID],
        }
      );
    } catch (err) {
      console.error("Error updating likes:", err);
    }
  };

  const handleView = async (projectId, currentViews, documentUrl) => {
    const isViewed = userActions[projectId]?.viewed || false;
    window.open(documentUrl, "_blank");

    if (!isViewed) {
      try {
        // Increment views locally
        setResearchProjects((prevProjects) =>
          prevProjects.map((project) =>
            project.$id === projectId
              ? { ...project, views: project.views + 1 }
              : project
          )
        );

        setUserActions((prevActions) => ({
          ...prevActions,
          [projectId]: { ...prevActions[projectId], viewed: true },
        }));

        await databases.updateDocument(
          "679549870000eafd23e3",
          "679549a900198ab41a28",
          projectId,
          { views: currentViews + 1 }
        );
      } catch (err) {
        console.error("Error updating views:", err);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      alert("You have been logged out successfully!");
      window.location.href = "/Login";
    } catch (error) {
      console.error("Error logging out:", error.message);
      alert("Failed to log out. Please try again.");
    }
  };

  const topViewedProjects = Array.isArray(researchProjects)
  ? [...researchProjects].sort((a, b) => b.views - a.views)
  : [];




  return (
    <div className=" bg-[#F5FBFF] min-h-screen font-sans flex-col">
      {/* header  */}
      <div className="h-20 bg-white flex justify-between items-center px-10">
          <img src={logo} alt="" />
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
              ALL RESEARCH PUBLICATIONS
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
        {topViewedProjects.slice(0, 3).map((project, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4 text-center w-[350px]">
            <img
              src={project.coverImage}
              alt={project.projectTitle}
              className="mx-auto mb-4 w-full h-40 object-fill rounded-md"
            />
            <h3 className="text-lg font-bold">{project.projectTitle}</h3>

            <div className="mt-4 text-xs text-gray-500 flex justify-center gap-4">
              <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full">
                {project.contributionType}
              </span>
              <span
                className={`px-2 py-1 rounded-full ${
                  project.projectStatus === 'Ongoing'
                    ? 'bg-yellow-300 text-yellow-800'
                    : 'bg-green-300 text-green-800'
                }`}
              >
                {project.projectStatus}
              </span>
            </div>

            <div className="mt-4 flex justify-between text-black text-base">
              <div>
                <p>{project.authorName}</p>
              </div>
              <div className="flex justify-between items-center gap-2">
                <div
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={() => handleLike(project.$id, project.likes, project.likedByUser)}
                >
                  <FontAwesomeIcon
                    icon={faHeart}
                    className={`${
                      userActions[project.$id]?.liked ? 'text-red-500' : 'text-gray-400'
                    }`}
                  />
                  {project.likes}
                </div>
                <div className="flex items-center gap-1">
                  <FontAwesomeIcon icon={faEye} className="text-gray-400" />
                  {project.views}
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-center">
              <button
                onClick={() => handleView(project.$id, project.views, project.document)}
                className="bg-[linear-gradient(to_right,_rgba(23,_40,_193,_1),_rgba(0,_109,_255,_1))] text-white px-4 py-2 rounded-md font-inter w-full"
              >
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
