import Compress from "browser-image-compression";

export const compressImage = async (file) => {
  try {
    const options = {
      maxSizeMB: 1.5,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    const compressedBlob = await Compress(file, options);

    compressedBlob.lastModifiedDate = new Date();

    // Convert the blob to file
    const convertedBlobFile = new File([compressedBlob], file.name, {
      type: file.type,
      lastModified: Date.now(),
    });

    return {
      compressedImage: convertedBlobFile,
      errorMessage: null,
    };
  } catch (error) {
    return {
      errorMessage: "Image not compressed!",
      compressedImage: null,
    };
  }
};
