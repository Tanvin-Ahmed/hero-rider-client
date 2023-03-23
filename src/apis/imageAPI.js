export const uploadImgInCloudinary = async (img) => {
  try {
    const formData = new FormData();
    formData.append("file", img);
    formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();

    return {
      errorMessage: null,
      data: data.public_id,
    };
  } catch (error) {
    return {
      errorMessage: error.message,
      data: null,
    };
  }
};
