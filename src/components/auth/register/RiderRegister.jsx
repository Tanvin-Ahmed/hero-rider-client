import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { uploadImgInCloudinary } from "../../../apis/imageAPI";
import { registerUser } from "../../../apis/usersAPI";
import { userInfoContext } from "../../../context/UserInfo";
import { getUserInfo } from "../../../utils/auth/getUserInfo";
import { compressImage } from "../../../utils/imageHandler/compressImage";
import Loader from "../../shared/Loader";

const RiderRegister = () => {
  const navigate = useNavigate();
  const { setUserInfo } = useContext(userInfoContext);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      if (data.password.trim() !== data.confirmPassword.trim()) {
        setLoading(false);
        alert("Passwords do not match!");
      }

      const { profile, drivingLicense, nid, ...info } = data;

      const { compressedImage: profileImg, errorMessage: profileError } =
        await compressImage(data.profile[0]);

      const {
        compressedImage: drivingLicenseImg,
        errorMessage: drivingLicenseError,
      } = await compressImage(data.drivingLicense[0]);

      const { compressedImage: nidImg, errorMessage: nidError } =
        await compressImage(data.nid[0]);

      if (profileError || drivingLicenseError || nidError) {
        setLoading(false);
        return alert("file not compressed");
      }

      const { data: profileImgData, errorMessage: e1 } =
        await uploadImgInCloudinary(profileImg);
      if (e1) {
        setLoading(false);
        return alert(e1);
      }

      const { data: drivingLicenseImgData, errorMessage: e2 } =
        await uploadImgInCloudinary(drivingLicenseImg);
      if (e2) {
        setLoading(false);
        return alert(e2);
      }

      const { data: nidImgData, errorMessage: e3 } =
        await uploadImgInCloudinary(nidImg);
      if (e3) {
        setLoading(false);
        return alert(e3);
      }

      const newInfo = {
        ...info,
        profile: profileImgData,
        drivingLicense: drivingLicenseImgData,
        nid: nidImgData,
        role: "rider",
        status: "normal",
      };

      await registerUser(newInfo);

      setUserInfo(getUserInfo());
      navigate("/profile");
      setLoading(false);
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

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
          Profile photo:
          <input
            type="file"
            placeholder="Enter your img"
            className="rounded px-3 py-2 w-full outline-none placeholder:text-[14px]"
            {...register("profile", { required: true })}
            accept="image/*"
          />
          {errors.profile && (
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
            type="text"
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
            type="text"
            placeholder="Enter your phone number"
            className="rounded px-3 py-2 w-full outline-none placeholder:text-[14px]"
            {...register("phone", { required: true })}
          />
          {errors.phone && (
            <span className="text-red-600">This field is required</span>
          )}
        </label>

        <label className="flex flex-col justify-center gap-y-2 mt-4">
          Driving license photo:
          <input
            type="file"
            placeholder="driving license photo"
            className="rounded px-3 py-2 w-full outline-none placeholder:text-[14px]"
            {...register("drivingLicense", { required: true })}
            accept="image/*"
          />
          {errors.drivingLicense && (
            <span className="text-red-600">This field is required</span>
          )}
        </label>

        <label className="flex flex-col justify-center gap-y-2 mt-4">
          Area:
          <input
            type="text"
            placeholder="Enter area where you drive car"
            className="rounded px-3 py-2 w-full outline-none placeholder:text-[14px]"
            {...register("area", { required: true })}
          />
          {errors.area && (
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
            accept="image/*"
          />
          {errors.nid && (
            <span className="text-red-600">This field is required</span>
          )}
        </label>
      </fieldset>
      <fieldset className="border-purple-600 border-2 rounded p-5 mt-4">
        <legend>Car information</legend>
        <label className="flex flex-col justify-center gap-y-2 mt-4">
          Name:
          <input
            type="text"
            placeholder="Enter car name"
            className="rounded px-3 py-2 w-full outline-none placeholder:text-[14px]"
            {...register("carName", { required: true })}
          />
          {errors.carName && (
            <span className="text-red-600">This field is required</span>
          )}
        </label>

        <label className="flex flex-col justify-center gap-y-2 mt-4">
          Model:
          <input
            type="text"
            placeholder="Enter car model"
            className="rounded px-3 py-2 w-full outline-none placeholder:text-[14px]"
            {...register("carModel", { required: true })}
          />
          {errors.carModel && (
            <span className="text-red-600">This field is required</span>
          )}
        </label>

        <label className="flex flex-col justify-center gap-y-2 mt-4">
          Name Palate:
          <input
            type="text"
            placeholder="Enter car name palate"
            className="rounded px-3 py-2 w-full outline-none placeholder:text-[14px]"
            {...register("namePalate", { required: true })}
          />
          {errors.namePalate && (
            <span className="text-red-600">This field is required</span>
          )}
        </label>

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
          disabled={loading}
        >
          Register
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

export default RiderRegister;
