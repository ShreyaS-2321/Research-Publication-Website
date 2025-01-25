import React, { useState, useEffect } from 'react';
import { databases, storage } from '../../appwrite'; // Adjust according to your Appwrite setup

function Allresearch() {
  const [researchProjects, setResearchProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await databases.listDocuments(
          '679549870000eafd23e3', // Your database ID
          '679549a900198ab41a28' // Your collection ID
        );
  
        // Fetch file URLs from storage using file IDs stored in the database
        const researchData = await Promise.all(result.documents.map(async (item) => {
          // Fetch the cover image and pdf file from storage
          const imageFile = await storage.getFileView('67954e160015d81d5269', item.coverImageFileId);
          return {
            ...item,
            coverImageUrl: imageFile.href, // Use this URL to display the image
          };
        }));

        setResearchProjects(researchData); // Update the state with the fetched research data
      } catch (error) {
        console.error('Error fetching research data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs once when the component mounts

  return (
    <div className="flex items-center justify-center">
      <div className="py-10 px-4 mt-10">
        <h2 className="text-xl font-semibold mb-12 text-center font-montserrat">
          FEATURED RESEARCH PROJECTS
        </h2>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-10">
          {researchProjects.map((project, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-4 text-center w-[350px]">
              <img
                src={project.coverImageUrl} // Dynamically display the image
                alt={project.title}
                className="mx-auto mb-4 w-full h-40 object-fill rounded-md"
              />
              <h3 className="text-lg font-bold">{project.title}</h3>
              <p className="text-gray-600 text-sm">{project.description}</p>

              <div className="mt-4 text-xs text-gray-500 flex justify-center gap-4">
                <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full">
                  {project.contributionType}
                </span>
                <span
                  className={`px-2 py-1 rounded-full ${project.status === "Ongoing" ? "bg-yellow-300 text-yellow-800" : "bg-green-300 text-green-800"}`}
                >
                  {project.status}
                </span>
              </div>

              <div className="mt-4 flex justify-between text-black text-base">
                <div>
                  <p>{project.contributor}</p>
                </div>
                <div className="flex justify-between gap-2">
                  <div>
                    {project.likes} Likes
                  </div>
                  <div>
                    {project.views} Views
                  </div>
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
  );
}

export default Allresearch;
