"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Image from "next/image";

interface Profile {
  id: number;
  name: string;
  surname: string;
  email: string;
  description: string;
  city: string;
  school: string;
  work: string;
  website: string;
  coverImage: string;
  profileImage: string;
  isPublic: boolean;
}

const ProfilePage = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [isPublic, setIsPublic] = useState(true);
  const [cover, setCover] = useState<string>("/chart.png");
  const [profilePicture, setProfilePicture] = useState<string>("/noAvatar.png");
  const [comment, setComment] = useState("");
  const [postImage, setPostImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const coverInputRef = useRef<HTMLInputElement | null>(null);
  const profileInputRef = useRef<HTMLInputElement | null>(null);
  const postImageInputRef = useRef<HTMLInputElement | null>(null);

  // Configure Axios
  axios.defaults.baseURL = "http://127.0.0.1:8000/api";
  axios.defaults.withCredentials = true;

  // Get token from localStorage
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // Fetch profile data
  const fetchProfile = async () => {
    if (!token) {
      console.error("Token is missing. Please log in.");
      return;
    }

    try {
      const response = await axios.get("/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = response.data;
      setProfile(data);
      setCover(data.coverImage || "/chart.png");
      setProfilePicture(data.profileImage || "/noAvatar.png");
      setIsPublic(data.isPublic);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  // Fetch posts
  const fetchPosts = async () => {
    if (!token) return;

    try {
      const response = await axios.get("/posts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchPosts();
  }, []);

  // Toggle profile visibility
  const toggleVisibility = async () => {
    if (!token) return;

    try {
      await axios.put(
        "/profile/visibility",
        { isPublic: !isPublic },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsPublic(!isPublic);
    } catch (error) {
      console.error("Error toggling visibility:", error);
    }
  };

  // Handle file uploads for cover/profile pictures
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const file = event.target.files?.[0];
    if (file && token) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const response = await axios.post("/media/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        setImage(response.data.filePath);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  // Submit new post
  const handlePostSubmit = async () => {
    if (!token) return;

    const postData = {
      content: comment,
      image: postImage,
    };
    try {
      const response = await axios.post("/posts", postData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts((prev) => [response.data, ...prev]);
      setComment("");
      setPostImage(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Cover Image */}
      <div
        className="relative h-64 mb-6 rounded-lg shadow-lg cursor-pointer"
        onClick={() => coverInputRef.current?.click()}
      >
        <Image src={cover} alt="Cover" layout="fill" objectFit="cover" />
        <input
          type="file"
          ref={coverInputRef}
          style={{ display: "none" }}
          onChange={(e) => handleFileUpload(e, setCover)}
        />
      </div>

      {/* Profile Picture */}
      <div
        className="relative mx-auto w-32 h-32 mb-4 rounded-full shadow-lg"
        onClick={() => profileInputRef.current?.click()}
      >
        <Image src={profilePicture} alt="Profile" width={128} height={128} />
        <input
          type="file"
          ref={profileInputRef}
          style={{ display: "none" }}
          onChange={(e) => handleFileUpload(e, setProfilePicture)}
        />
      </div>

      {/* Profile Info */}
      <h2 className="text-2xl font-semibold">
        {profile.name} {profile.surname}
      </h2>
      <p className="text-gray-500">{profile.description}</p>

      <button
        className={`mt-4 px-4 py-2 text-white rounded ${isPublic ? "bg-green-500" : "bg-red-500"}`}
        onClick={toggleVisibility}
      >
        {isPublic ? "Public" : "Private"}
      </button>

      {/* Add Post */}
      <div className="mt-8">
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setIsModalOpen(true)}>
          Add Post
        </button>
      </div>

      {/* Posts */}
      <div className="mt-6 space-y-4">
        {posts.map((post, index) => (
          <div key={index} className="bg-white p-4 shadow rounded-lg">
            {post.image && <img src={post.image} alt="Post" className="mb-4 rounded-lg" />}
            <p>{post.content}</p>
            <small>{new Date(post.created_at).toLocaleString()}</small>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your post"
              className="w-full border border-gray-300 p-2 rounded-lg mb-4"
            />
            <input
              type="file"
              ref={postImageInputRef}
              onChange={(e) => handleFileUpload(e, setPostImage)}
            />
            <button className="bg-blue-500 text-white px-4 py-2 mt-4" onClick={handlePostSubmit}>
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
