import AddPost from "@/components/AddPost";
import Feed from "@/components/Feed";

const Homepage = () => {
  return (
    <div className="pt-6">
      <div className="w-full lg:w-[70%] xl:w-[50%] mx-auto"> 
        <div className="flex flex-col gap-6 items-center justify-center">
          <AddPost />
          <Feed />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
