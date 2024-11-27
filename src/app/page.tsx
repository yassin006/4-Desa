import AddPost from "@/components/AddPost";
import Stories from "@/components/Stories";
import Feed from "@/components/Feed";

const Homepage = () => {
  return (
    <div className="pt-6">
      <div className="w-full lg:w-[70%] xl:w-[50%] mx-auto"> 
        <div className="flex flex-col gap-6 items-center justify-center">
          <Stories />
          <AddPost />
          <Feed />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
