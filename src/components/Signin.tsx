import Link from "next/link";
import Image from 'next/image'; // Add this import at the top of your file

const Signin = () => {
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
          <form className="w-full max-w-md">
            {/* Logo Section - Centered and Bigger */}
            <div className="mb-6">
              <Image
                src="/logo icone orange.png"
                alt="Go to homepage"
                width={56} // Increased size
                height={56} // Increased size
                className="mx-auto" // Centered horizontally
              />
            </div>        
            <div className="mb-3">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-green-400 focus:outline-none"
              />
            </div>
            {/* Password Input */}
            <div className="mb-3">
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-green-400 focus:outline-none"
              />
            </div>
            {/* Login Button */}
            <button className="w-full bg-[#6100ff] hover:bg-[#5a00e6] text-white font-semibold py-2 px-4 rounded-lg">
              Log In
            </button>
            {/* Forgot Password Link */}
            <div className="text-right mt-2">
              <Link href="/forgotpassword" className="text-[#fa8c00] text-sm underline">
                Forgot Password?
              </Link>
            </div>
          </form>
          {/* Google Sign-in */}
          <p className="text-gray-500 text-sm mt-4">or</p>
          <button className="flex items-center justify-center gap-2 bg-white border border-gray-300 shadow py-2 px-4 rounded-lg mt-4">
            <img src="./google.png" alt="Google icon" className="w-6 h-6" />
            <span>Sign in with Google</span>
          </button>
          {/* Sign-up Link */}
          <p className="text-gray-600 text-sm mt-4">
            New Here? <Link href="/signup" className="text-[#fa8c00] font-semibold">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
