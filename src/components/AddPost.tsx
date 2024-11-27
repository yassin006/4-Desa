"use client";

import { useState } from "react";
import Image from "next/image";

const AddPost = () => {
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState<any>();

  return (
    <div className="max-w-2xl mx-auto p-4 bg-transparent backdrop-blur-md rounded-lg shadow-md flex gap-4 justify-between text-sm">
      <Image
        src="/noAvatar.png"
        alt="Profile Avatar"
        width={48}
        height={48}
        className="w-12 h-12 object-cover rounded-full"
      />
      {/* POST */}
      <div className="flex-1">
        {/* TEXT INPUT */}
        <form className="flex gap-4">
          <textarea
            placeholder="What's on your mind?"
            className="flex-1 min-w-[300px] bg-slate-100 rounded-lg p-2 resize-none"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          <div>
            <Image
              src="/emoji.png"
              alt="Emoji"
              width={20}
              height={20}
              className="w-5 h-5 cursor-pointer self-end"
            />
          </div>
        </form>
        {/* POST OPTIONS */}
        <div className="flex items-center gap-4 mt-4 text-gray-400 flex-wrap">
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/addVideo.png" alt="Add Video" width={20} height={20} />
            Video
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/poll.png" alt="Poll" width={20} height={20} />
            Poll
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/addevent.png" alt="Event" width={20} height={20} />
            Event
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
