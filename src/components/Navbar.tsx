"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import MobileMenu from "./MobileMenu";
import axios from "axios";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSignOut = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/api/logout"); // Sign out the user
      setIsAuthenticated(false); // Update state on logout
      window.location.href = "/"; // Redirect to homepage after sign-out
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

  return (
    <div className="h-24 flex items-center justify-between px-4 md:px-8">
      <div className="w-[20%]">
        <Link href="/" className="font-bold text-xl text-blue-600">
          <Image src="/logo1.png" alt="Go to homepage" width={160} height={66} />
        </Link>
      </div>

      <div className="hidden md:flex w-[50%] text-sm items-center justify-between">
        <div className="flex gap-6 text-gray-600">
          <Link href="/" className="flex items-center gap-2 hover:text-[#fa8c00]">
            <Image src="/home.png" alt="Go to homepage" width={16} height={16} />
            <span>Homepage</span>
          </Link>
          <Link href="/friends" className="flex items-center gap-2 hover:text-[#fa8c00]">
            <Image src="/friends.png" alt="View friends" width={16} height={16} />
            <span>Friends</span>
          </Link>
        </div>
        <div className="hidden xl:flex p-2 bg-slate-100 items-center rounded-xl shadow-md">
          <input
            type="text"
            placeholder="Search for friends, posts, or topics..."
            className="bg-transparent outline-none px-2 w-full"
          />
          <Image src="/search.png" alt="Search" width={14} height={14} />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <MobileMenu />
        {isAuthenticated ? (
          <>
            <Link href="/profile">
              <button className="px-4 py-2 bg-[#6100ff] text-white text-sm rounded-md hover:bg-[#5a00e6] transition">
                Profile
              </button>
            </Link>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-gray-500 text-white text-sm rounded-md hover:bg-gray-600 transition"
            >
              Sign Out
            </button>
          </>
        ) : (
          <Link href="/Signin">
            <button className="px-4 py-2 bg-[#6100ff] text-white text-sm rounded-md hover:bg-[#5a00e6] transition">
              Sign In
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
