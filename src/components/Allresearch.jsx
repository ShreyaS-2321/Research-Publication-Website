import React, { useState, useEffect } from 'react';
import { databases } from '../../appwrite'; // Your Appwrite setup
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';

function Allresearch() {
  const [researchProjects, setResearchProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userActions, setUserActions] = useState({}); // Store likes and views for each project

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
              likes: item.likes || 0,
              views: item.views || 0,
            };
          }
          return {}; // Handle invalid items
        });

        setResearchProjects(researchData);

        // Initialize user actions
        const initialActions = {};
        researchData.forEach((project) => {
          // Retrieve like status from localStorage
          const likedStatus = localStorage.getItem(`liked_${project.$id}`);
          initialActions[project.$id] = { liked: likedStatus === 'true', viewed: false };
        });
        setUserActions(initialActions);
      } catch (err) {
        console.error('Error fetching research data:', err);
        setError('Failed to fetch research projects.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle like toggle
  const handleLike = async (projectId, currentLikes) => {
    const isLiked = userActions[projectId]?.liked || false;

    try {
      // Update likes locally
      setResearchProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.$id === projectId
            ? { ...project, likes: isLiked ? project.likes - 1 : project.likes + 1 }
            : project
        )
      );

      // Toggle like status
      setUserActions((prevActions) => ({
        ...prevActions,
        [projectId]: { ...prevActions[projectId], liked: !isLiked },
      }));

      // Save like status to localStorage
      localStorage.setItem(`liked_${projectId}`, !isLiked);

      // Update likes in Appwrite
      await databases.updateDocument(
        '679549870000eafd23e3', // Database ID
        '679549a900198ab41a28', // Collection ID
        projectId,
        { likes: isLiked ? currentLikes - 1 : currentLikes + 1 }
      );
    } catch (err) {
      console.error('Error updating likes:', err);
    }
  };

  // Handle view tracking
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
    <div className="flex bg-[#F5FBFF] items-center justify-center">
      <div className="py-10 px-4 mt-10">
        <h2 className="text-xl font-semibold mb-12 text-center font-montserrat">
          ALL RESEARCH PROJECTS
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
                    onClick={() => handleLike(project.$id, project.likes)}
                  >
                    <FontAwesomeIcon icon={faHeart}
                      className={`${
                        userActions[project.$id]?.liked ? 'text-blue-500' : 'text-gray-400'
                      }`}
                    />{project.likes}{' '}
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
  );
}

export default Allresearch;
