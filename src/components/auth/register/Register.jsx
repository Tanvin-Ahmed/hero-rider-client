import { useState } from "react";
import LearnerRegister from "./LearnerRegister";
import RiderRegister from "./RiderRegister";

const Register = () => {
  const [rider, SetRider] = useState(true);

  const handleToggle = () => {
    SetRider((p) => !p);
  };

  return (
    <>
      <div className="flex justify-around items-center my-4">
        <button
          onClick={handleToggle}
          className={`${
            rider ? "bg-slate-800" : "bg-blue-500 hover:bg-blue-700"
          }  text-white font-bold py-2 px-4 rounded`}
          type="button"
          disabled={rider}
        >
          Rider
        </button>
        <button
          onClick={handleToggle}
          className={`${
            !rider ? "bg-slate-800" : "bg-blue-500 hover:bg-blue-700"
          }  text-white font-bold py-2 px-4 rounded`}
          type="button"
          disabled={!rider}
        >
          Learner
        </button>
      </div>
      <h1 className="my-6 text-center text-[25px]">
        {rider ? "Rider Form" : "Learner Form"}
      </h1>
      {rider ? <RiderRegister /> : <LearnerRegister />}
    </>
  );
};

export default Register;
