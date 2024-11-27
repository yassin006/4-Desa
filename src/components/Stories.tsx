import Image from "next/image";
import StoryList from "./StoryList";

const Stories = async () => {
  const storyData = [
    { id: 1, src: "/courses.png", name: "Story 1" },
    { id: 2, src: "/courses.png", name: "Story 2" },
    { id: 3, src: "/courses.png", name: "Story 3" },
    { id: 4, src: "/courses.png", name: "Story 4" },
    { id: 5, src: "/courses.png", name: "Story 5" },
  ];

  return (
    <div className="max-w-2xl mx-auto p-4 bg-transparent backdrop-blur-md rounded-lg shadow-md">
      <div className="flex gap-4 overflow-x-auto scrollbar-hide">
        {storyData.map((story) => (
          <div key={story.id} className="flex flex-col items-center">
            <div className="relative w-20 h-20 rounded-full ring-2 ring-blue-500">
              <Image
                src={story.src}
                alt={story.name}
                width={80}
                height={80}
                className="rounded-full object-cover"
              />
            </div>
            <p className="mt-2 text-xs text-center text-gray-600">{story.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stories;
