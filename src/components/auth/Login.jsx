import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

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
          Register
        </button>
      </div>
    </form>
  );
};

export default Login;
