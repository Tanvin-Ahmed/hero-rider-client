import { useContext } from "react";
import { userInfoContext } from "../context/UserInfo";

const Home = () => {
  const { userInfo } = useContext(userInfoContext);
  return (
    <div className="home-page">
      <div className="cover">
        <div className="container mx-auto px-4 flex flex-col justify-center h-full">
          <h1 className="text-[40px] sm:text-[60px]">
            Welcome to <span className="text-purple-600">Hero Rider</span>
          </h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem
            eveniet pariatur laboriosam dolores itaque quaerat quo corporis,
            nesciunt officia accusamus ut, non vitae porro nemo sapiente
            blanditiis repellat culpa. Nihil cum quis praesentium atque illum
            labore, in deleniti similique, doloremque deserunt dolores.
          </p>
          {!userInfo && (
            <div className="my-4">
              <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
