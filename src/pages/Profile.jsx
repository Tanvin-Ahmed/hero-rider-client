import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { profileData } from "../utils/data";

const Profile = () => {
  const { register } = useForm();

  const [profileInfo, setProfileInfo] = useState({});

  useEffect(() => {
    setProfileInfo(profileData);
  }, []);

  return (
    <div className="container mx-auto px-4">
      <div className="overflow-y-auto w-full flex justify-center items-center flex-col py-4 px-5">
        <h1 className="text-center text-[25px]">Profile</h1>

        <form>
          <fieldset className="border-purple-600 border-2 rounded p-5">
            <legend>My Information</legend>

            <div className="flex justify-center items-center">
              <img
                src={profileInfo.profile}
                alt="profile"
                className="rounded-full object-cover h-24 w-24 my-3"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <label className="flex flex-col justify-center gap-y-2 mt-4">
                Full Name:
                <input
                  defaultValue={profileInfo?.fullName}
                  type="text"
                  placeholder="Enter your full name"
                  className="rounded px-3 py-2 w-full outline-none placeholder:text-[14px]"
                  {...register("fullName", { required: true })}
                  disabled
                />
              </label>

              <label className="flex flex-col justify-center gap-y-2 mt-4">
                Email:
                <input
                  defaultValue={profileInfo?.email}
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  className="rounded px-3 py-2 w-full outline-none placeholder:text-[14px]"
                  {...register("email", { required: true })}
                  disabled
                />
              </label>

              <label className="flex flex-col justify-center gap-y-2 mt-4">
                Age:
                <input
                  defaultValue={profileInfo?.age}
                  type="date"
                  placeholder="Enter your age"
                  className="rounded px-3 py-2 w-full outline-none placeholder:text-[14px]"
                  {...register("age", { required: true })}
                  disabled
                />
              </label>

              <label className="flex flex-col justify-center gap-y-2 mt-4">
                Address:
                <textarea
                  defaultValue={profileInfo?.address}
                  rows={4}
                  cols={2}
                  name="address"
                  placeholder="Enter your address"
                  className="rounded px-3 py-2 w-full outline-none placeholder:text-[14px]"
                  {...register("address", { required: true })}
                  disabled
                />
              </label>

              <label className="flex flex-col justify-center gap-y-2 mt-4">
                Phone Number:
                <input
                  defaultValue={profileInfo?.phone}
                  type="number"
                  placeholder="Enter your phone number"
                  className="rounded px-3 py-2 w-full outline-none placeholder:text-[14px]"
                  {...register("phone", { required: true })}
                  disabled
                />
              </label>

              <label className="flex flex-col justify-center gap-y-2 mt-4">
                Area:
                <input
                  defaultValue={profileInfo?.area}
                  type="text"
                  placeholder="Enter area where you drive car"
                  className="rounded px-3 py-2 w-full outline-none placeholder:text-[14px]"
                  {...register("area", { required: true })}
                  disabled
                />
              </label>

              <label className="flex flex-col justify-center gap-y-2 mt-4">
                Driving license photo:
                <img
                  src={profileInfo.drivingLicense}
                  alt="driving license"
                  className="w-full h-full rounded"
                />
              </label>

              <label className="flex flex-col justify-center gap-y-2 mt-4">
                NID photo:
                <img
                  src={profileInfo.nid}
                  alt="driving license"
                  className="w-full h-full rounded"
                />
              </label>
            </div>
          </fieldset>
          <fieldset className="border-purple-600 border-2 rounded p-5 mt-4">
            <legend>My Car information</legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <label className="flex flex-col justify-center gap-y-2 mt-4">
                Name:
                <input
                  defaultValue={profileInfo?.carName}
                  type="text"
                  placeholder="Enter car name"
                  className="rounded px-3 py-2 w-full outline-none placeholder:text-[14px]"
                  {...register("carName", { required: true })}
                  disabled
                />
              </label>

              <label className="flex flex-col justify-center gap-y-2 mt-4">
                Model:
                <input
                  defaultValue={profileInfo?.carModel}
                  type="text"
                  placeholder="Enter car model"
                  className="rounded px-3 py-2 w-full outline-none placeholder:text-[14px]"
                  {...register("carModel", { required: true })}
                  disabled
                />
              </label>

              <label className="flex flex-col justify-center gap-y-2 mt-4">
                Vehicle type:
                <input
                  defaultValue={profileInfo?.vehicleType}
                  type="text"
                  placeholder="Enter car model"
                  className="rounded px-3 py-2 w-full outline-none placeholder:text-[14px]"
                  {...register("vehicleType", { required: true })}
                  disabled
                />
              </label>

              <label className="flex flex-col justify-center gap-y-2 mt-4">
                Name Palate:
                <img
                  src={profileInfo.namePalate}
                  alt="driving license"
                  className="w-full h-full rounded"
                />
              </label>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Profile;
