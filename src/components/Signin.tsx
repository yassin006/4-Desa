"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";  // To redirect after successful login

const Signin = ({ setAuthenticated }: { setAuthenticated: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [error, setError] = useState(""); // State for error messages
  const [isLoading, setIsLoading] = useState(false); // Loading state for the button
  const router = useRouter();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form from reloading the page
    setError(""); // Clear previous errors
    setIsLoading(true); // Show loading indicator

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      });

      // Handle successful login response
      console.log("Login successful:", response.data);

      // Update the authentication state in Navbar
      setAuthenticated(true);

      // Redirect to dashboard or homepage
      router.push("/dashboard");  // Modify the redirect URL as needed
    } catch (error: any) {
      setError("Invalid email or password. Please try again.");
      setIsLoading(false); // Stop loading when error occurs
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-transparent">
      <div className="flex w-[400%] max-w-3xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Side (Image Section) */}
        <div
          className="hidden md:flex md:flex-1 bg-cover bg-center"
          style={{ backgroundImage: "url('./chart.png')" }}
        ></div>
        {/* Right Side (Form Section) */}
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <form onSubmit={handleSubmit} className="w-full max-w-md">
            {/* Logo Section - Centered and Bigger */}
            <div className="mb-6">
              <Image
                src="/logo icone orange.png"
                alt="Go to homepage"
                width={56}
                height={56}
                className="mx-auto"
              />
            </div>
            {/* Email Input */}
            <div className="mb-3">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-green-400 focus:outline-none"
              />
            </div>
            {/* Password Input */}
            <div className="mb-3">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-green-400 focus:outline-none"
              />
            </div>
            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full ${isLoading ? "bg-gray-400" : "bg-[#6100ff]"} hover:bg-[#5a00e6] text-white font-semibold py-2 px-4 rounded-lg`}
            >
              {isLoading ? "Logging in..." : "Log In"}
            </button>
            {/* Error Message */}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            {/* Forgot Password Link */}
            <div className="text-right mt-2">
              <Link href="/forgotpassword" className="text-[#fa8c00] text-sm underline">
                Forgot Password?
              </Link>
            </div>
            {/* Sign Up Link */}
            <div className="text-center mt-4">
              <Link href="/signup" className="text-[#6100ff] text-sm underline">
                Don't have an account? Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
