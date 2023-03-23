import Tilt from "react-parallax-tilt";
import car from "../../assets/packages/car.jpg";
import bike from "../../assets/packages/bike.jpg";
import { useNavigate } from "react-router-dom";

const PackageCard = ({ data, profile }) => {
  const navigate = useNavigate();

  const handleRoute = () => {
    navigate(`/packages/single/${data?._id}`);
  };

  return (
    <Tilt>
      <div className="p-3 rounded border-2 border-purple-700">
        <img
          src={data.image === "car" ? car : bike}
          alt={data.name}
          className="w-full h-36 rounded object-cover mb-2"
        />
        <div>
          <h3 className="text-[20px]">{data?.name}</h3>
          {!profile ? (
            <>
              <p className="my-2">Price: {data?.price}$</p>
              <button
                onClick={handleRoute}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
              >
                Purchase
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={handleRoute}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            >
              Start
            </button>
          )}
        </div>
      </div>
    </Tilt>
  );
};

export default PackageCard;
