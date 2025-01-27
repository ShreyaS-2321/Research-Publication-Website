import React, { useState, useEffect } from 'react';
import { databases, storage } from '../../appwrite'; // Import your appwrite setup

function Allresearch() {
  const [researchProjects, setResearchProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from Appwrite on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Query the documents from Appwrite database
        const result = await databases.listDocuments(
          '679549870000eafd23e3', // Your database ID
          '679549a900198ab41a28' // Your collection ID
        );

        console.log('Appwrite Fetch Result:', result); // Log the response

        if (result.documents.length === 0) {
          setError('No research projects available.');
        }

        const researchData = await Promise.all(
          result.documents.map(async (item) => {
            // Ensure that the field names match your Appwrite collection schema
            const coverImageUrl = storage.getFileView('67954e160015d81d5269', item.coverImage).href;
            const pdfUrl = storage.getFileView('67954e160015d81d5269', item.document).href;

            return {
              ...item,
              coverImageUrl,
              pdfUrl,
            };
          })
        );

        setResearchProjects(researchData);
      } catch (err) {
        console.error('Error fetching research data:', err);
        setError('Failed to fetch research projects.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const openPdf = (pdfUrl) => {
    window.open(pdfUrl, '_blank');
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return (
    <div>
      <p className="text-red-500">{error}</p>
      <button onClick={() => window.location.reload()} className="mt-4 bg-blue-500 text-white p-2 rounded">Retry</button>
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
                <div className="flex justify-between gap-2">
                  <div>{project.likes} Likes</div>
                  <div>{project.views} Views</div>
                </div>
              </div>

              <div className="mt-4 flex justify-center">
                <button
                  onClick={() => openPdf(project.document)}
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
