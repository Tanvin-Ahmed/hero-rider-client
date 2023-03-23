import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { userInfoContext } from "../context/UserInfo";
import { profileData } from "../utils/data";
import avatar from "../assets/avatar.png";
import { Image } from "cloudinary-react";

const Profile = () => {
  const { register } = useForm();
  const { userInfo } = useContext(userInfoContext);

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
              {userInfo?.profile ? (
                <Image
                  cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
                  publicId={userInfo?.profile}
                />
              ) : (
                <img
                  src={avatar}
                  alt="profile"
                  className="rounded-full object-cover h-24 w-24 my-3"
                />
              )}
            </div>

            <div
              className={`grid grid-cols-1 sm:grid-cols-2 ${
                userInfo?.role === "admin" ? "lg:grid-cols-2" : "lg:grid-cols-3"
              } gap-4`}
            >
              <label className="flex flex-col justify-center gap-y-2 mt-4">
                Full Name:
                <input
                  defaultValue={userInfo?.fullName}
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
                  defaultValue={userInfo?.email}
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  className="rounded px-3 py-2 w-full outline-none placeholder:text-[14px]"
                  {...register("email", { required: true })}
                  disabled
                />
              </label>

              {userInfo?.role !== "admin" && (
                <>
                  <label className="flex flex-col justify-center gap-y-2 mt-4">
                    Age:
                    <input
                      defaultValue={userInfo?.age}
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
                      defaultValue={userInfo?.address}
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
                      defaultValue={userInfo?.phone}
                      type="number"
                      placeholder="Enter your phone number"
                      className="rounded px-3 py-2 w-full outline-none placeholder:text-[14px]"
                      {...register("phone", { required: true })}
                      disabled
                    />
                  </label>

                  {userInfo?.area && (
                    <label className="flex flex-col justify-center gap-y-2 mt-4">
                      Area:
                      <input
                        defaultValue={userInfo?.area}
                        type="text"
                        placeholder="Enter area where you drive car"
                        className="rounded px-3 py-2 w-full outline-none placeholder:text-[14px]"
                        {...register("area", { required: true })}
                        disabled
                      />
                    </label>
                  )}

                  {userInfo?.drivingLicense && (
                    <label className="flex flex-col justify-center gap-y-2 mt-4">
                      Driving license photo:
                      <img
                        src={userInfo?.drivingLicense}
                        alt="driving license"
                        className="w-full h-full rounded"
                      />
                    </label>
                  )}

                  <label className="flex flex-col justify-center gap-y-2 mt-4">
                    NID photo:
                    <img
                      src={userInfo?.nid}
                      alt="driving license"
                      className="w-full h-full rounded"
                    />
                  </label>
                </>
              )}
            </div>
          </fieldset>
          {userInfo?.role !== "admin" && (
            <fieldset className="border-purple-600 border-2 rounded p-5 mt-4">
              <legend>My Car information</legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {userInfo?.role === "rider" && (
                  <>
                    <label className="flex flex-col justify-center gap-y-2 mt-4">
                      Name:
                      <input
                        defaultValue={userInfo?.carName}
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
                        defaultValue={userInfo?.carModel}
                        type="text"
                        placeholder="Enter car model"
                        className="rounded px-3 py-2 w-full outline-none placeholder:text-[14px]"
                        {...register("carModel", { required: true })}
                        disabled
                      />
                    </label>

                    <label className="flex flex-col justify-center gap-y-2 mt-4">
                      Name Palate:
                      <input
                        defaultValue={userInfo?.namePalate}
                        type="text"
                        placeholder="Enter car model"
                        className="rounded px-3 py-2 w-full outline-none placeholder:text-[14px]"
                        {...register("vehicleType", { required: true })}
                        disabled
                      />
                    </label>
                  </>
                )}

                <label className="flex flex-col justify-center gap-y-2 mt-4">
                  Vehicle type:
                  <input
                    defaultValue={userInfo?.vehicleType}
                    type="text"
                    placeholder="Enter car model"
                    className="rounded px-3 py-2 w-full outline-none placeholder:text-[14px]"
                    {...register("vehicleType", { required: true })}
                    disabled
                  />
                </label>
              </div>
            </fieldset>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile;
