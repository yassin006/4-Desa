"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";

const ProfilePage = () => {
  const [isPublic, setIsPublic] = useState(true); // State to track the toggle
  const [cover, setCover] = useState("/chart.png"); // State for cover image
  const [profilePicture, setProfilePicture] = useState("/noAvatar.png"); // State for profile picture
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [postImage, setPostImage] = useState(null); // State for the post image
  const [comment, setComment] = useState(""); // State for the comment

  const coverInputRef = useRef(null); // Ref for cover image input
  const profileInputRef = useRef(null); // Ref for profile picture input
  const postImageInputRef = useRef(null); // Ref for post image input

  const profile = {
    name: "John",
    surname: "Doe",
    description: "A passionate developer focused on frontend technologies.",
    city: "New York",
    school: "XYZ University",
    work: "Frontend Developer at TechCorp",
    website: "https://www.johndoe.com",
    followers: 1200, // Example followers count
  };

  const toggleVisibility = () => {
    setIsPublic(!isPublic);
  };

  const handleCoverChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCover(url);
    }
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfilePicture(url);
    }
  };

  const handlePostImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPostImage(url);
    }
  };

  const handlePostSubmit = () => {
    console.log("Post Image:", postImage);
    console.log("Comment:", comment);
    setIsModalOpen(false); // Close modal after submission
    setPostImage(null); // Clear the post image
    setComment(""); // Clear the comment
  };

  return (
    <div className="max-w-4xl mx-auto p-2 bg-gradient-to-b from-gray-100 to-gray-50">
      {/* Cover Image */}
      <div
        className="relative h-80 mb-8 rounded-lg overflow-hidden shadow-xl cursor-pointer"
        onClick={() => coverInputRef.current.click()}
      >
        <Image
          src={cover}
          alt="Cover Image"
          layout="fill"
          objectFit="cover"
          className="transform transition duration-500 ease-in-out hover:scale-105"
        />
        <input
          type="file"
          accept="image/*"
          ref={coverInputRef}
          onChange={handleCoverChange}
          style={{ display: "none" }}
        />
      </div>

      <div className="text-center relative z-10">
        {/* Profile Picture */}
        <div
          className="relative inline-block mb-4 cursor-pointer"
          onClick={() => profileInputRef.current.click()}
        >
          <Image
            src={profilePicture}
            alt="Profile Picture"
            width={120}
            height={120}
            className="rounded-full border-4 border-white shadow-xl transform transition duration-300 ease-in-out hover:scale-110"
          />
          <input
            type="file"
            accept="image/*"
            ref={profileInputRef}
            onChange={handleProfilePictureChange}
            style={{ display: "none" }}
          />
        </div>

        {/* Profile Information */}
        <h1 className="text-3xl font-semibold text-gray-800">
          {profile.name} {profile.surname}
        </h1>
        <p className="italic text-gray-600 mt-1 mb-4 text-base">
          {profile.description}
        </p>
        <div className="text-sm text-gray-700 space-y-2">
          <p>
            <strong className="text-gray-800">City:</strong> {profile.city}
          </p>
          <p>
            <strong className="text-gray-800">School:</strong> {profile.school}
          </p>
          <p>
            <strong className="text-gray-800">Work:</strong> {profile.work}
          </p>
          <p>
            <strong className="text-gray-800">Website:</strong>{" "}
            <a
              href={profile.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {profile.website}
            </a>
          </p>
        </div>

        {/* Private/Public Toggle Button */}
        <div className="mt-4">
          <button
            onClick={toggleVisibility}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition duration-300 ${
              isPublic ? "bg-green-500 text-white" : "bg-red-500 text-white"
            }`}
          >
            {isPublic ? "Public" : "Private"}
          </button>
        </div>
      </div>

      {/* Button Section */}
      <div className="mt-8">
        <button
          className="w-full py-3 bg-[#6100ff] text-white font-semibold rounded-lg shadow-lg hover:bg-[#6100ff] transition duration-300 ease-in-out transform hover:scale-105"
          onClick={() => setIsModalOpen(true)}
        >
          +
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-bold mb-4">Create a Post</h2>

            {/* Post Image */}
            <div
              className="relative w-full h-40 bg-gray-200 rounded-lg cursor-pointer mb-4 flex items-center justify-center"
              onClick={() => postImageInputRef.current.click()}
            >
              {postImage ? (
                <Image
                  src={postImage}
                  alt="Post"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              ) : (
                <span className="text-gray-500">Click to add a photo</span>
              )}
              <input
                type="file"
                accept="image/*"
                ref={postImageInputRef}
                onChange={handlePostImageChange}
                style={{ display: "none" }}
              />
            </div>

            {/* Comment */}
            <textarea
              placeholder="Write a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            ></textarea>

            {/* Submit and Cancel Buttons */}
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-[#6100ff] text-white rounded-lg"
                onClick={handlePostSubmit}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
