import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../../apis/usersAPI";
import { userInfoContext } from "../../context/UserInfo";
import { getUserInfo } from "../../utils/auth/getUserInfo";
import Loader from "../shared/Loader";

const selectUrl = (role) => {
  switch (role) {
    case "admin":
      return "/admin";
    case "learner":
      return "/packages";
    case "rider":
      return "/profile";
    default:
      return "/";
  }
};

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const { setUserInfo } = useContext(userInfoContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    const { errorMessage } = await loginUser(data);

    if (errorMessage) {
      alert(errorMessage);
      setLoading(false);
    } else {
      setLoading(false);
      const user = getUserInfo();
      setUserInfo(user);
      const from = location.state?.from?.pathname || selectUrl(user?.role);
      navigate(from);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label className="flex flex-col justify-center gap-y-2 mt-4">
        Email:
        <input
          type="email"
          placeholder="Enter your email address"
          className="rounded px-3 py-2 w-full outline-none placeholder:text-[14px]"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="text-red-600">This field is required</span>
        )}
      </label>

      <label className="flex flex-col justify-center gap-y-2 mt-4">
        Password:
        <input
          type="password"
          placeholder="Enter your password"
          className="rounded px-3 py-2 w-full outline-none placeholder:text-[14px]"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <span className="text-red-600">This field is required</span>
        )}
      </label>
      <div className="flex justify-center items-center mt-5">
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </button>
      </div>
      {loading && (
        <div className="my-4">
          <Loader />
        </div>
      )}
    </form>
  );
};

export default Login;
