import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { account, storage, databases } from "appwrite";

const Uploadform = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const { fields, append } = useFieldArray({
    control,
    name: "teamMembers",
  });

  const [isTeam, setIsTeam] = useState(false);
  const [tags, setTags] = useState([]);

  const handleTagInput = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "" && tags.length < 10) {
      setTags([...tags, e.target.value.trim()]);
      e.target.value = ""; // Clear the input after adding tag
    }
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, idx) => idx !== index));
  };

  const contributionType = watch("contributionType");

  useEffect(() => {
    if (contributionType === "Team") {
      setIsTeam(true);
    } else {
      setIsTeam(false);
    }
  }, [contributionType]);

  const onSubmit = async (data) => {
    // File Upload Handling
    try {
      // Upload the PDF Document
      const pdfFile = data.document[0];
      const pdfFileUploaded = await storage.createFile(
        "67954e160015d81d5269", // Your bucket ID from Appwrite
        pdfFile.name,
        pdfFile
      );
  
      // Upload the Cover Image
      const imageFile = data.coverImage[0];
      const imageFileUploaded = await storage.createFile(
        "67954e160015d81d5269", // Your bucket ID from Appwrite
        imageFile.name,
        imageFile
      );
  
      // Save the form data along with file IDs to Appwrite database
      const response = await databases.createDocument(
        "679549870000eafd23e3", // The database ID from Appwrite
        "679549a900198ab41a28", // The collection ID from Appwrite
        {
          projectTitle: data.projectTitle,
          authorName: data.authorName,
          projectStatus: data.projectStatus,
          contributionType: data.contributionType,
          tags: tags.join(", "), // Convert tags array to string
          coverImage: coverImageUpload.$id, // Store the Appwrite file ID
          document: documentUpload.$id, // Store the Appwrite file ID
          userId: user.$id, // Save the user ID to associate the research idea with the user
          teamMembers: data.teamMembers?.map((member) => member.name),
        }
      );
  
      console.log("Form submitted successfully", response);
      // Optionally, redirect to another page after submission
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="bg-[#F5FBFF] h-full flex-col">
      {/* Header */}
      <div className="bg-white h-16 shadow-sm"></div>
      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-3xl mx-auto bg-white p-6 m-12 shadow-lg rounded-lg"
      >
        <h2 className="text-xl text-center font-bold mb-6 font-montserrat bg-[linear-gradient(to_right,_rgba(23,_40,_193,_1),_rgba(0,_109,_255,_1))] bg-clip-text text-transparent">
          UPLOAD YOUR RESEARCH IDEA
        </h2>

        <div className="mb-4">
          <label
            htmlFor="projectTitle"
            className="block font-medium mb-1 font-inter"
          >
            Title of the Research Idea
          </label>
          <input
            type="text"
            id="projectTitle"
            placeholder="Enter research idea title"
            className="w-full border border-gray-300 p-2 rounded-md outline-blue-700 font-inter"
            {...register("projectTitle", { required: "Title is required" })}
          />
          {errors.projectTitle && (
            <p className="text-red-500 text-sm mt-1">
              {errors.projectTitle.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="authorName"
            className="block font-medium mb-1 font-inter"
          >
            Author Name or Team Leader Name
          </label>
          <input
            type="text"
            id="authorName"
            placeholder="Enter author name"
            className="w-full border border-gray-300 p-2 rounded-md outline-blue-700 font-inter"
            {...register("authorName", { required: "Author name is required" })}
          />
          {errors.authorName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.authorName.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="projectStatus"
            className="block font-medium mb-1 font-inter"
          >
            Research Idea Status
          </label>
          <select
            id="projectStatus"
            className="w-full border border-gray-300 p-2 rounded-md outline-blue-700 font-inter cursor-pointer"
            {...register("projectStatus", { required: "Status is required" })}
          >
            <option value="" disabled>
              Select Status
            </option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
          </select>
          {errors.projectStatus && (
            <p className="text-red-500 text-sm mt-1">
              {errors.projectStatus.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="contributionType"
            className="block font-medium mb-1 font-inter"
          >
            Contribution Type
          </label>
          <select
            id="contributionType"
            className="w-full border border-gray-300 p-2 rounded-md outline-blue-700 font-inter cursor-pointer"
            {...register("contributionType", { required: "Contribution type is required" })}
          >
            <option value="" disabled>
              Select Type
            </option>
            <option value="Solo">Solo</option>
            <option value="Team">Team</option>
          </select>
          {errors.contributionType && (
            <p className="text-red-500 text-sm mt-1">
              {errors.contributionType.message}
            </p>
          )}
        </div>

        {isTeam && (
          <>
            {fields.map((field, index) => (
              <div key={field.id} className="mb-4">
                <label
                  htmlFor={`teamMember${index}`}
                  className="block font-medium mb-1 font-inter"
                >
                  Team Member {index + 1} Name
                </label>
                <input
                  type="text"
                  id={`teamMember${index}`}
                  placeholder={`Enter team member ${index + 1} name`}
                  className="w-full border border-gray-300 p-2 rounded-md outline-blue-700 font-inter"
                  {...register(`teamMembers.${index}.name`, {
                    required: "Team member name is required",
                  })}
                />
                {errors.teamMembers?.[index]?.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.teamMembers[index].name.message}
                  </p>
                )}
              </div>
            ))}

            {fields.length < 6 && (
              <button
                type="button"
                onClick={() => append({ name: "" })}
                className="text-white font-normal p-2 mb-4 font-inter rounded-md bg-[linear-gradient(to_right,_rgba(23,_40,_193,_1),_rgba(0,_109,_255,_1))]"
              >
                Add more member
              </button>
            )}
          </>
        )}

        <div className="mb-4">
          <label htmlFor="tags" className="block font-medium mb-1 font-inter">
            Tags (Max 10)
          </label>
          <input
            type="text"
            id="tags"
            placeholder="Enter a tag and press Enter key"
            className="w-full border border-gray-300 p-2 rounded-md outline-blue-700 font-inter"
            onKeyDown={handleTagInput}
            {...register("tags")}
          />
          <div className="flex flex-wrap mt-2">
            {tags.map((tag, index) => (
              <div
                key={index}
                className="bg-blue-50 text-black px-2 py-1 rounded-md flex items-center mr-2 mb-2"
              >
                <span>{tag}</span>
                <button
                  type="button"
                  onClick={() => removeTag(index)}
                  className="ml-2 text-red-500"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1 font-inter">
            Upload Document (PDF only)
          </label>
          <input
            type="file"
            accept=".pdf"
            className="w-full border border-gray-300 p-2 rounded-md outline-blue-700 font-inter cursor-pointer"
            {...register("document", { required: "Document is required" })}
          />
          {errors.document && (
            <p className="text-red-500 text-sm mt-1">
              {errors.document.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1 font-inter">
            Upload Cover Image
          </label>
          <input
            type="file"
            accept=".jpg,.png"
            className="w-full border border-gray-300 p-2 rounded-md outline-blue-700 font-inter cursor-pointer"
            {...register("coverImage")}
          />
        </div>

        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="terms"
            className="mr-2"
            {...register("terms", { required: "You must agree to the terms" })}
          />
          <label htmlFor="terms" className="text-sm">
            I agree to the {" "}
            <a href="#" className="text-blue-700">
              Privacy Policy
            </a>{" "}
            and {" "}
            <a href="#" className="text-blue-700">
              Terms of Service
            </a>
            .
          </label>
          {errors.terms && (
            <p className="text-red-500 text-sm mt-1">
              {errors.terms.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-[linear-gradient(to_right,_rgba(23,_40,_193,_1),_rgba(0,_109,_255,_1))] text-white p-2 rounded-md font-inter"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Uploadform;
