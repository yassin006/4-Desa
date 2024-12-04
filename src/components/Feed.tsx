"use client"; // Directive to indicate this is a client-side component

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

const Feed = () => {
  const [posts, setPosts] = useState<any[]>([]); // State to store posts
  const [selectedPost, setSelectedPost] = useState<any | null>(null); // State to store selected post

  // Fetch posts from API
  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from storage (if available)
      const response = await axios.get("http://127.0.0.1:8000/api/posts", {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
      setPosts(response.data); // Assuming API returns an array of posts
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  

  // Fetch posts when the component mounts
  useEffect(() => {
    fetchPosts();
  }, []);

  const closeComments = () => setSelectedPost(null);

  return (
    <div className="max-w-2xl mx-auto p-4 bg-transparent backdrop-blur-md">
      {/* Scrollable posts list */}
      <div className="space-y-6 overflow-y-auto h-[80vh] scrollbar-hide">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white shadow-lg rounded-xl p-4 hover:shadow-xl transition-shadow duration-300 ease-in-out"
          >
            {/* Post header with user's profile picture and name */}
            <div className="sticky top-0 bg-transparent z-10 p-2 flex items-center space-x-3">
              <div className="relative w-10 h-10">
                <Image
                  src={post.user.profilePic || "/noAvatar.png"} // Fallback if no profile picture
                  alt={post.user.name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
              </div>
              <p className="font-semibold text-gray-800">{post.user.name}</p>
            </div>

            {/* Post image */}
            {post.image && (
              <Image
                src={post.image}
                alt={post.title}
                width={500}
                height={300}
                className="rounded-lg object-cover transition-transform transform hover:scale-105 duration-200"
              />
            )}

            {/* Post title */}
            <p className="mt-2 font-semibold text-gray-800">{post.title}</p>

            {/* Post content */}
            <p className="mt-2 text-gray-600">{post.content}</p>

            {/* Button to view comments */}
            <button
              className="mt-4 text-blue-500 hover:underline"
              onClick={() => setSelectedPost(post)}
            >
              Voir les commentaires
            </button>
          </div>
        ))}
      </div>

      {/* Popup for comments section */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full backdrop-blur-lg">
            <h3 className="text-lg font-bold mb-4">Commentaires</h3>
            <ul className="space-y-2">
              {selectedPost.comments && selectedPost.comments.length > 0 ? (
                selectedPost.comments.map((comment: string, index: number) => (
                  <li key={index} className="p-2 bg-gray-100 rounded-lg">
                    {comment}
                  </li>
                ))
              ) : (
                <li className="p-2 bg-gray-100 rounded-lg">Aucun commentaire</li>
              )}
            </ul>
            <button
              className="mt-4 text-red-500 hover:underline"
              onClick={closeComments}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feed;
