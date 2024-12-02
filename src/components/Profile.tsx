"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

// Définir la structure de l'objet profile
interface Profile {
  id: number;
  name: string;
  surname: string;
  email: string;  // Added email to the profile interface
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
  const [isPublic, setIsPublic] = useState(true); // État pour suivre la visibilité
  const [cover, setCover] = useState<string>("/chart.png"); // État pour l'image de couverture
  const [profilePicture, setProfilePicture] = useState<string>("/noAvatar.png"); // État pour l'image de profil
  const [isModalOpen, setIsModalOpen] = useState(false); // État pour afficher le modal
  const [postImage, setPostImage] = useState<string | null>(null); // État pour l'image du post
  const [comment, setComment] = useState(""); // État pour le commentaire
  const [profile, setProfile] = useState<Profile | null>(null); // État pour les données du profil
  const [posts, setPosts] = useState<any[]>([]); // État pour les posts

  const coverInputRef = useRef<HTMLInputElement | null>(null); // Réf pour l'input de l'image de couverture
  const profileInputRef = useRef<HTMLInputElement | null>(null); // Réf pour l'input de l'image de profil
  const postImageInputRef = useRef<HTMLInputElement | null>(null); // Réf pour l'input de l'image du post

  // Récupérer les données du profil et les posts depuis le backend au montage du composant
  useEffect(() => {
    // Récupérer les données du profil
    axios
      .get("http://127.0.0.1:8000/api/profile") // Remplacer par l'endpoint réel du profil
      .then((response) => {
        const { data } = response;
        setProfile(data);
        setCover(data.coverImage || "/chart.png");
        setProfilePicture(data.profileImage || "/noAvatar.png");
        setIsPublic(data.isPublic);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données du profil:", error);
      });

    // Récupérer les posts de l'utilisateur
    axios
      .get("http://127.0.0.1:8000/api/posts") // Remplacer par l'endpoint réel pour récupérer les posts
      .then((response) => {
        setPosts(response.data); // Mettre à jour l'état des posts avec les données récupérées
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des posts:", error);
      });
  }, []);

  // Basculer la visibilité du profil (public/privé)
  const toggleVisibility = () => {
    axios
      .post("http://127.0.0.1:8000/api/profile/toggle-visibility", { isPublic: !isPublic }) // Remplacer par votre API de bascule de visibilité
      .then(() => {
        setIsPublic(!isPublic); // Basculer la visibilité localement
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour de la visibilité:", error);
      });
  };

  // Gérer le changement de l'image de couverture
  const handleCoverChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Obtenir le premier fichier
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result as string;
        setCover(base64Image); // Mettre à jour l'image de couverture
        localStorage.setItem("coverImage", base64Image); // Sauvegarder en local
      };
      reader.readAsDataURL(file); // Convertir l'image en base64
    }
  };

  // Gérer le changement de l'image de profil
  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Obtenir le premier fichier
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result as string;
        setProfilePicture(base64Image); // Mettre à jour l'image de profil
        localStorage.setItem("profileImage", base64Image); // Sauvegarder en local
      };
      reader.readAsDataURL(file); // Convertir l'image en base64
    }
  };

  // Gérer le changement de l'image du post
  const handlePostImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Obtenir le premier fichier
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result as string;
        setPostImage(base64Image); // Mettre à jour l'image du post
      };
      reader.readAsDataURL(file); // Convertir l'image en base64
    }
  };

  // Soumettre un post
  const handlePostSubmit = () => {
    const postData = {
      user_email: profile?.email, // Utiliser l'email de l'utilisateur
      content: comment,     // Le contenu du commentaire
      image: postImage,     // L'image associée au post si elle existe
    };

    axios
      .post("http://127.0.0.1:8000/api/posts", postData) // Remplacer par votre endpoint réel pour créer un post
      .then((response) => {
        setIsModalOpen(false); // Fermer le modal après la soumission
        setPostImage(null); // Réinitialiser l'image du post
        setComment(""); // Réinitialiser le commentaire

        // Ajouter le nouveau post à la liste des posts
        setPosts((prevPosts) => [
          ...prevPosts,
          { ...postData, created_at: new Date().toISOString() }, // Simuler une date de création
        ]);
      })
      .catch((error) => {
        console.error("Erreur lors de la création du post:", error);
      });
  };

  if (!profile) {
    return <div>Chargement...</div>; // Afficher un message de chargement jusqu'à ce que les données du profil soient récupérées
  }

  return (
    <div className="max-w-4xl mx-auto p-2 bg-gradient-to-b from-gray-100 to-gray-50">
      {/* Image de couverture */}
      <div
        className="relative h-80 mb-8 rounded-lg overflow-hidden shadow-xl cursor-pointer"
        onClick={() => coverInputRef.current?.click()}
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
        {/* Image de profil */}
        <div
          className="relative inline-block mb-4 cursor-pointer"
          onClick={() => profileInputRef.current?.click()}
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

        {/* Informations du profil */}
        <h1 className="text-3xl font-semibold text-gray-800">
          {profile.name} {profile.surname}
        </h1>
        <p className="italic text-gray-600 mt-1 mb-4 text-base">
          {profile.description}
        </p>
        <div className="text-sm text-gray-700 space-y-2">
          <p>
            <strong className="text-gray-800">Ville:</strong> {profile.city}
          </p>
          <p>
            <strong className="text-gray-800">École:</strong> {profile.school}
          </p>
          <p>
            <strong className="text-gray-800">Travail:</strong> {profile.work}
          </p>
          <p>
            <strong className="text-gray-800">Site Web:</strong>{" "}
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

        {/* Bouton Public/Privé */}
        <div className="mt-4">
          <button
            onClick={toggleVisibility}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition duration-300 ${
              isPublic ? "bg-green-500 text-white" : "bg-red-500 text-white"
            }`}
          >
            {isPublic ? "Public" : "Privé"}
          </button>
        </div>
      </div>

      {/* Bouton de création de post */}
      <div className="mt-8 text-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg"
        >
          Ajouter un post
        </button>
      </div>

      {/* Liste des posts */}
      <div className="mt-8 space-y-6">
        {posts.map((post, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
            {post.image && (
              <div className="relative w-full h-64 mb-4 bg-gray-200 rounded-lg overflow-hidden">
                <Image
                  src={post.image}
                  alt="Post Image"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
            )}
            <p className="text-gray-700">{post.content}</p>
            <div className="mt-2 text-gray-500 text-sm">
              <strong>{post.user.name}</strong> -{" "}
              {new Date(post.created_at).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      {/* Modal pour ajouter un post */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg max-w-lg w-full">
            <h2 className="text-2xl mb-4">Ajouter un post</h2>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Écrivez votre commentaire"
              rows={4}
            />
            {postImage && (
              <div className="relative w-full h-64 mb-4 bg-gray-200 rounded-lg overflow-hidden mt-4">
                <Image
                  src={postImage}
                  alt="Post Image"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              ref={postImageInputRef}
              onChange={handlePostImageChange}
              className="my-4"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded-lg"
              >
                Annuler
              </button>
              <button
                onClick={handlePostSubmit}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg"
              >
                Publier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
