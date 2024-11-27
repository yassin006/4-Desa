"use client"; // Directive pour indiquer que ce composant est un composant client

import { useState } from "react";
import Image from "next/image";

const Feed = () => {
  const [selectedPost, setSelectedPost] = useState(null);

  const posts = [
    {
      id: 1,
      image: "/chart.png",
      user: {
        name: "John Doe",
        profilePic: "/noAvatar.png", // Remplace avec "noAvatar.png"
      },
      note: "Amazing day at the park!",
      comments: ["Lovely!", "Looks fun!", "Where is this?"],
    },
    {
      id: 2,
      image: "/chart.png",
      user: {
        name: "Jane Smith",
        profilePic: "/noAvatar.png", // Remplace avec "noAvatar.png"
      },
      note: "My new favorite place!",
      comments: ["So beautiful!", "I want to visit!", "Great shot!"],
    },
    {
      id: 3,
      image: "/chart.png",
      user: {
        name: "Alice Brown",
        profilePic: "/noAvatar.png", // Remplace avec "noAvatar.png"
      },
      note: "Throwback to this moment",
      comments: ["Wow!", "I remember this!", "Awesome!"],
    },
  ];

  const closeComments = () => setSelectedPost(null);

  return (
    <div className="max-w-2xl mx-auto p-4 bg-transparent backdrop-blur-md">
      {/* Défilement vertical pour les posts */}
      <div className="space-y-6 overflow-y-auto h-[80vh] scrollbar-hide">
        {posts.map((post) => (
          <div key={post.id} className="bg-white shadow-lg rounded-xl p-4 hover:shadow-xl transition-shadow duration-300 ease-in-out">
            {/* En-tête du post avec la photo de profil et le nom de l'utilisateur */}
            <div className="sticky top-0 bg-transparent z-10 p-2 flex items-center space-x-3">
              <div className="relative w-10 h-10">
                <Image
                  src={post.user.profilePic}
                  alt={post.user.name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
              </div>
              <p className="font-semibold text-gray-800">{post.user.name}</p>
            </div>

            {/* Image de la publication */}
            <Image
              src={post.image}
              alt={post.note}
              width={500}
              height={300}
              className="rounded-lg object-cover transition-transform transform hover:scale-105 duration-200"
            />

            {/* Note/Titre */}
            <p className="mt-2 font-semibold text-gray-800">{post.note}</p>

            {/* Bouton pour les commentaires */}
            <button
              className="mt-4 text-blue-500 hover:underline"
              onClick={() => setSelectedPost(post)}
            >
              Voir les commentaires
            </button>
          </div>
        ))}
      </div>

      {/* Popup pour la section de commentaires */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full backdrop-blur-lg">
            <h3 className="text-lg font-bold mb-4">Commentaires</h3>
            <ul className="space-y-2">
              {selectedPost.comments.map((comment, index) => (
                <li key={index} className="p-2 bg-gray-100 rounded-lg">
                  {comment}
                </li>
              ))}
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
