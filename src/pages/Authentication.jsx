import { useState } from "react";
import Login from "../components/auth/Login";
import Register from "../components/auth/register/Register";

const Authentication = () => {
  const [login, setLogin] = useState(true);

  const handleToggle = () => {
    setLogin((login) => !login);
  };

  return (
    <div className="container mx-auto px-4">
      <div
        className={`w-full ${
          login ? "h-screen" : "h-full"
        } flex justify-center items-center p-4`}
      >
        <div className="blur-bg p-4">
          {login ? <Login /> : <Register />}
          {login ? (
            <small className="mt-6 block">
              New in here?{" "}
              <span
                className="text-purple-600 underline cursor-pointer"
                onClick={handleToggle}
              >
                Create account
              </span>
            </small>
          ) : (
            <small className="mt-6 block">
              Have an account?{" "}
              <span
                className="text-purple-600 underline cursor-pointer"
                onClick={handleToggle}
              >
                Login
              </span>
            </small>
          )}
        </div>
      </div>
    </div>
  );
};

export default Authentication;
