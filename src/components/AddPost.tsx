"use client";

import { useState } from "react";
import axios from "axios";
import Image from "next/image";

const AddPost = () => {
  const [title, setTitle] = useState(""); // For the "title" field
  const [content, setContent] = useState(""); // For the "content" field
  const [img, setImg] = useState<File | null>(null); // Image file
  const userId = 1; // Replace with actual user ID, possibly fetched from context or props

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImg(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("user_id", userId.toString());
    if (img) {
      formData.append("img", img);
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Post created:", response.data);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-md flex flex-col items-center space-y-4">
      {/* User Avatar and Input */}
      <div className="flex items-center space-x-4 w-full">
        <Image
          src="/noAvatar.png"
          alt="Profile Avatar"
          width={48}
          height={48}
          className="w-12 h-12 object-cover rounded-full"
        />
        <input
          type="text"
          placeholder="What's on your mind?"
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      {/* File and Title Inputs */}
      <div className="w-full">
        <input
          type="text"
          placeholder="Add a title..."
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full text-gray-600 border border-gray-300 rounded-lg px-4 py-2 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full bg-[#6100ff] text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300"
      >
        Post
      </button>
    </div>
  );
};

export default AddPost;
