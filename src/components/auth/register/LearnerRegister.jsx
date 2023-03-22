import { useForm } from "react-hook-form";

const LearnerRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="border-purple-600 border-2 rounded p-5">
        <legend>User Info</legend>
        <label className="flex flex-col justify-center gap-y-2 mt-4">
          Full Name:
          <input
            type="text"
            placeholder="Enter your full name"
            className="rounded px-3 py-2 w-full outline-none placeholder:text-[14px]"
            {...register("fullName", { required: true })}
          />
          {errors.fullName && (
            <span className="text-red-600">This field is required</span>
          )}
        </label>

        <label className="flex flex-col justify-center gap-y-2 mt-4">
          Email:
          <input
            type="email"
            name="email"
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

        <label className="flex flex-col justify-center gap-y-2 mt-4">
          Confirm Password:
          <input
            type="password"
            placeholder="Enter your confirmation password"
            className="rounded px-3 py-2 w-full outline-none placeholder:text-[14px]"
            {...register("confirmPassword", { required: true })}
          />
          {errors.confirmPassword && (
            <span className="text-red-600">This field is required</span>
          )}
        </label>

        <label className="flex flex-col justify-center gap-y-2 mt-4">
          Age:
          <input
            type="date"
            placeholder="Enter your age"
            className="rounded px-3 py-2 w-full outline-none placeholder:text-[14px]"
            {...register("age", { required: true })}
          />
          {errors.age && (
            <span className="text-red-600">This field is required</span>
          )}
        </label>

        <label className="flex flex-col justify-center gap-y-2 mt-4">
          Address:
          <textarea
            rows={4}
            cols={2}
            name="address"
            placeholder="Enter your address"
            className="rounded px-3 py-2 w-full outline-none placeholder:text-[14px]"
            {...register("address", { required: true })}
          />
          {errors.address && (
            <span className="text-red-600">This field is required</span>
          )}
        </label>

        <label className="flex flex-col justify-center gap-y-2 mt-4">
          Phone Number:
          <input
            type="number"
            placeholder="Enter your phone number"
            className="rounded px-3 py-2 w-full outline-none placeholder:text-[14px]"
            {...register("phone", { required: true })}
          />
          {errors.phone && (
            <span className="text-red-600">This field is required</span>
          )}
        </label>
        <label className="flex flex-col justify-center gap-y-2 mt-4">
          NID photo:
          <input
            type="file"
            placeholder="NID photo"
            className="rounded px-3 py-2 w-full outline-none placeholder:text-[14px]"
            {...register("nid", { required: true })}
          />
          {errors.nid && (
            <span className="text-red-600">This field is required</span>
          )}
        </label>

        <label className="flex flex-col justify-center gap-y-2 mt-4">
          Profile photo:
          <input
            type="file"
            placeholder="Enter your img"
            className="rounded px-3 py-2 w-full outline-none placeholder:text-[14px]"
            {...register("profile", { required: true })}
          />
          {errors.profile && (
            <span className="text-red-600">This field is required</span>
          )}
        </label>
      </fieldset>
      <fieldset className="border-purple-600 border-2 rounded p-5 mt-4">
        <legend>Car information</legend>
        <label className="flex flex-col justify-center gap-y-2 mt-4">
          Vehicle type:
          <select
            defaultValue={"car"}
            className="outline-none rounded px-3 py-2 w-full placeholder:text-[14px]"
            {...register("vehicleType", { required: true })}
          >
            <option value="car">Car</option>
            <option value="bike">Bike</option>
          </select>
          {errors.vehicleType && (
            <span className="text-red-600">This field is required</span>
          )}
        </label>
      </fieldset>
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

export default LearnerRegister;
