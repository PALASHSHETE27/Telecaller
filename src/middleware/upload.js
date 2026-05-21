import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "telecaller_profiles",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

export default multer({ storage });
