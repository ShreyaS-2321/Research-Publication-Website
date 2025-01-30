import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { databases, account } from '../../appwrite'; // Your Appwrite setup
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import profile from "../assets/profile.png"
import background from "../assets/background.svg"

function Allresearch() {
  const [researchProjects, setResearchProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
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
          '679549870000eafd23e3', // Your database ID
          '679549a900198ab41a28' // Your collection ID
        );

        if (result.documents.length === 0) {
          setError('No research projects available.');
        }

        const researchData = result.documents.map((item) => {
          if (item && typeof item === 'object') {
            return {
              ...item,
              likes: item.likedByUser?.length || 0, // Calculate likes based on likedByUser array
              views: item.views || 0,
              likedByUser: item.likedByUser || [] // Ensure likedByUser is an array
            };
          }
          return {}; // Handle invalid items
        });

        setResearchProjects(researchData);

        // Initialize user actions
        const initialActions = {};
        researchData.forEach((project) => {
          initialActions[project.$id] = {
            liked: project.likedByUser.includes(currentUserID) // Check if the current user liked it
          };
        });
        setUserActions(initialActions);
      } catch (err) {
        console.error('Error fetching research data:', err);
        setError('Failed to fetch research projects.');
      } finally {
        setIsLoading(false);
      }
    };

    if (currentUserID) {
      fetchData();
    }
  }, [currentUserID]);

  const handleLike = async (projectId, currentLikes, likedByUser) => {
    const isLiked = userActions[projectId]?.liked || false;

    try {
      // Update likes locally
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

      // Update likes and likedByUser in Appwrite
      await databases.updateDocument(
        '679549870000eafd23e3', // Database ID
        '679549a900198ab41a28', // Collection ID
        projectId,
        {
          likes: isLiked ? currentLikes - 1 : currentLikes + 1,
          likedByUser: isLiked
            ? likedByUser.filter((user) => user !== currentUserID)
            : [...likedByUser, currentUserID]
        }
      );
    } catch (err) {
      console.error('Error updating likes:', err);
    }
  };

  const handleView = async (projectId, currentViews, documentUrl) => {
    const isViewed = userActions[projectId]?.viewed || false;

    // Open document URL
    window.open(documentUrl, '_blank');

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

        // Mark as viewed locally
        setUserActions((prevActions) => ({
          ...prevActions,
          [projectId]: { ...prevActions[projectId], viewed: true },
        }));

        // Update views in Appwrite
        await databases.updateDocument(
          '679549870000eafd23e3', // Database ID
          '679549a900198ab41a28', // Collection ID
          projectId,
          { views: currentViews + 1 }
        );
      } catch (err) {
        console.error('Error updating views:', err);
      }
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error)
    return (
      <div>
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-blue-500 text-white p-2 rounded"
        >
          Retry
        </button>
      </div>
    );

  return (
    <div className="bg-[#F5FBFF] min-h-screen">
      {/* Header */}
      <div className="h-16 bg-white flex items-center justify-between px-10">
        <Link to="/Home" className="bg-red-600 rounded-md p-2 text-white">Back</Link>
                  <img className="rounded-full h-[40px] w-[40px] object-contain border-2 border-blue-700" src={profile} alt="" />
      </div>
      {/* Search section */}
      <div
              className=" text-white py-10 h-auto text-center relative"
              style={{
                backgroundImage: `url(${background})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
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
      {/* All research section */}
      <div className="flex items-center justify-center">
        <div className="py-10 px-4 mt-8">
        <h2 className="text-xl font-semibold mb-12 text-center font-montserrat">
          ALL 
          <span className='bg-[linear-gradient(to_right,_rgba(23,_40,_193,_1),_rgba(0,_109,_255,_1))] bg-clip-text text-transparent font-montserrat'> RESEARCH </span>
          PUBLICATIONS
        </h2>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-10">
          {researchProjects.map((project, index) => (
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
                    {project.likes}{' '}
                  </div>
                  <div className="flex items-center gap-1">
                    <FontAwesomeIcon icon={faEye} className="text-gray-400" />
                    {project.views}{' '}
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
    </div>
  );
}

export default Allresearch;