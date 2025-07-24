const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    const isVideo = file.mimetype.startsWith("video/");
    const baseName = file.originalname.split(".")[0];
    const timestamp = Date.now();
    return {
      folder: "the-cao",
      resource_type: isVideo ? "video" : "image",
      allowed_formats: ["jpg", "png", "jpeg", "webp", "mp4", "mov", "avi"],
      public_id: `${baseName}_${timestamp}`,
    };
  },
});

module.exports = {
  cloudinary,
  storage,
};
