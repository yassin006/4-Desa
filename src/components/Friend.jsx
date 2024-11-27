"use client";

import React, { useState } from "react";
import Image from "next/image";

const FriendPage = () => {
  const [isFriend, setIsFriend] = useState(false); // State to track friendship status

  const profile = {
    name: "John",
    surname: "Doe",
    description: "A passionate developer focused on frontend technologies.",
    city: "New York",
    school: "XYZ University",
    work: "Frontend Developer at TechCorp",
    website: "https://www.johndoe.com",
    cover: "/chart.png",
    profile_picture: "/noAvatar.png",
    followers: 1200, // Example followers count
  };

  const toggleFriendStatus = () => {
    setIsFriend(!isFriend);
  };

  return (
    <div className="max-w-4xl mx-auto p-2 bg-gradient-to-b from-gray-100 to-gray-50">
      {/* Cover Image */}
      <div className="relative h-80 mb-8 rounded-lg overflow-hidden shadow-xl">
        <Image
          src={profile.cover}
          alt="Cover Image"
          layout="fill"
          objectFit="cover"
          className="transform transition duration-500 ease-in-out hover:scale-105"
        />
      </div>

      <div className="text-center relative z-10">
        {/* Profile Picture */}
        <div className="relative inline-block mb-4">
          <Image
            src={profile.profile_picture}
            alt={`${profile.name} ${profile.surname}`}
            width={120}
            height={120}
            className="rounded-full border-4 border-white shadow-xl transform transition duration-300 ease-in-out hover:scale-110"
          />
          {/* Followers count */}
          <div className="mt-2 text-sm text-gray-600">
            <span className="font-semibold text-gray-800">{profile.followers}</span> followers
          </div>
        </div>

        {/* Profile Name */}
        <h1 className="text-3xl font-semibold text-gray-800">
          {profile.name} {profile.surname}
        </h1>
        <p className="italic text-gray-600 mt-1 mb-4 text-base">{profile.description}</p>

        {/* Profile Details */}
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
            <strong className="text-gray-800">Website:</strong>
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

        {/* Add Friend Button */}
        <div className="mt-6">
          <button
            onClick={toggleFriendStatus}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition duration-300 ${
              isFriend
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-gray-500 text-white hover:bg-gray-600"
            }`}
          >
            {isFriend ? "Friend Added" : "Add Friend"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FriendPage;
