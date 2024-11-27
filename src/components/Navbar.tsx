import Link from "next/link";
import MobileMenu from "./MobileMenu";
import Image from "next/image";
import Signin from "./Signin";

const Navbar = () => {
  return (
    <div className="h-24 flex items-center justify-between px-4 md:px-8">
      {/* LEFT */}
      <div className="w-[20%]">
        <Link href="/" className="font-bold text-xl text-blue-600">
          <Image
            src="/logo1.png"
            alt="Go to homepage"
            width={160}
            height={66}
            className="w"
          />
        </Link>
      </div>

      {/* CENTER */}
      <div className="hidden md:flex w-[50%] text-sm items-center justify-between">
        <div className="flex gap-6 text-gray-600">
          <Link href="/" className="flex items-center gap-2 hover:text-[#fa8c00]">
            <Image
              src="/home.png"
              alt="Go to homepage"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            <span>Homepage</span>
          </Link>
          <Link href="/friends" className="flex items-center gap-2 hover:text-[#fa8c00]">
            <Image
              src="/friends.png"
              alt="View friends"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            <span>Friends</span>
          </Link>
          <Link href="/stories" className="flex items-center gap-2 hover:text-[#fa8c00]">
            <Image
              src="/stories.png"
              alt="View stories"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            <span>Stories</span>
          </Link>
        </div>
        <div className="hidden xl:flex p-2 bg-slate-100 items-center rounded-xl shadow-md">
          <input
            type="text"
            placeholder="Search for friends, posts, or topics..."
            className="bg-transparent outline-none px-2 w-full"
          />
          <Image
            src="/search.png"
            alt="Search"
            width={14}
            height={14}
            className="cursor-pointer"
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        <MobileMenu />
        <Link href="/Signin">
          <button className="px-4 py-2 bg-[#6100ff] text-white text-sm rounded-md hover:bg-[#5a00e6] transition">
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
