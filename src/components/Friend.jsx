"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";

const FriendProfile = ({ friendId }) => {
  const [profile, setProfile] = useState(null); // État pour stocker le profil de l'ami
  const [isFriend, setIsFriend] = useState(false); // État pour suivre l'état de l'amitié
  const [error, setError] = useState(null); // État pour gérer les erreurs
  const [posts, setPosts] = useState([]); // État pour stocker les posts de l'ami
  const [isClient, setIsClient] = useState(false); // Suivre si l'on est en mode client

  // Détecter si le composant est monté côté client
  useEffect(() => {
    setIsClient(true); // Mettre à jour le flag pour client
  }, []);

  // Charger les données du profil et des posts après le rendu côté client
  useEffect(() => {
    if (!isClient || !friendId) return;

    const fetchProfile = async () => {
      try {
        // Récupérer le profil de l'ami
        const profileResponse = await axios.get(`https://api.example.com/users/${friendId}`);
        setProfile(profileResponse.data);

        // Récupérer les posts de l'ami
        const postsResponse = await axios.get(`https://api.example.com/users/${friendId}/posts`);
        setPosts(postsResponse.data);
      } catch (err) {
        console.error("Erreur lors du chargement des données de l'ami:", err);
        setError("Impossible de charger les données du profil.");
      }
    };

    fetchProfile();
  }, [isClient, friendId]); // Dépendance sur isClient et friendId

  // Ajouter un ami en utilisant l'email au lieu du friendId
  const addFriend = async () => {
    try {
      if (!profile?.email) throw new Error("Email manquant");

      const response = await axios.post("https://api.example.com/friends", { email: profile.email });
      if (response.status === 200) {
        setIsFriend(true);
        setError(null); // Effacer les erreurs précédentes
      } else {
        throw new Error("Échec de l'ajout de l'ami.");
      }
    } catch (err) {
      console.error("Erreur lors de l'ajout de l'ami:", err);
      setError("Impossible d'ajouter l'ami. Veuillez réessayer.");
    }
  };

  // Convertir les images en base64 et les stocker dans le localStorage
  const handleImageChange = (imageUrl, type) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result;
      switch (type) {
        case "cover":
          localStorage.setItem("coverImage", base64Image);
          break;
        case "profile":
          localStorage.setItem("profileImage", base64Image);
          break;
        case "post":
          localStorage.setItem("postImage", base64Image);
          break;
      }
    };
    reader.readAsDataURL(imageUrl); // Convertir l'image en base64
  };
  

  if (!isClient) return null; // Empêcher le rendu côté serveur

  if (!profile) {
    return <p>Chargement du profil...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-2 bg-gradient-to-b from-gray-100 to-gray-50">
      {/* Image de couverture */}
      <div className="relative h-80 mb-8 rounded-lg overflow-hidden shadow-xl">
        <Image
          src={profile.cover || "/default-cover.jpg"}
          alt="Cover Image"
          layout="fill"
          objectFit="cover"
          className="transform transition duration-500 ease-in-out hover:scale-105"
        />
      </div>

      <div className="text-center relative z-10">
        {/* Image de profil */}
        <div className="relative inline-block mb-4">
          <Image
            src={profile.profile_picture || "/default-avatar.png"}
            alt={`${profile.name} ${profile.surname}`}
            width={120}
            height={120}
            className="rounded-full border-4 border-white shadow-xl transform transition duration-300 ease-in-out hover:scale-110"
          />
          {/* Nombre de followers */}
          <div className="mt-2 text-sm text-gray-600">
            <span className="font-semibold text-gray-800">{profile.followers || 0}</span> followers
          </div>
        </div>

        {/* Nom du profil */}
        <h1 className="text-3xl font-semibold text-gray-800">
          {profile.name} {profile.surname}
        </h1>
        <p className="italic text-gray-600 mt-1 mb-4 text-base">{profile.description}</p>

        {/* Détails du profil */}
        <div className="text-sm text-gray-700 space-y-2">
          <p>
            <strong className="text-gray-800">Ville:</strong> {profile.city || "Inconnue"}
          </p>
          <p>
            <strong className="text-gray-800">École:</strong> {profile.school || "Non renseigné"}
          </p>
          <p>
            <strong className="text-gray-800">Travail:</strong> {profile.work || "Non renseigné"}
          </p>
          <p>
            <strong className="text-gray-800">Site Web:</strong>
            <a
              href={profile.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {profile.website || "Aucun site"}
            </a>
          </p>
        </div>

        {/* Bouton Ajouter en tant qu'ami */}
        <div className="mt-6">
          <button
            onClick={addFriend}
            disabled={isFriend}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition duration-300 ${
              isFriend
                ? "bg-green-500 text-white cursor-not-allowed"
                : "bg-gray-500 text-white hover:bg-gray-600"
            }`}
          >
            {isFriend ? "Ami ajouté" : "Ajouter en ami"}
          </button>
        </div>

        {/* Message d'erreur */}
        {error && <p className="mt-4 text-red-500">{error}</p>}

        {/* Posts de l'ami */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Posts</h2>
          {posts.length === 0 ? (
            <p className="text-gray-600">Aucun post disponible.</p>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post.id} className="bg-white shadow rounded-lg p-4">
                  <Image
                    src={post.image || "/default-post.jpg"}
                    alt={post.title || "Image du post"}
                    width={500}
                    height={300}
                    className="rounded-lg object-cover"
                  />
                  <p className="mt-2 text-gray-800 font-semibold">{post.title}</p>
                  <p className="text-gray-600 text-sm">{post.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Utilisation de Link pour la navigation vers le profil
const FriendLink = ({ friendId }) => {
  return (
    <Link href={`/friend-profile/${friendId}`} passHref>
      <button className="text-blue-500 hover:underline">
        Voir le profil de l'ami
      </button>
    </Link>
  );
};

export default FriendProfile;
