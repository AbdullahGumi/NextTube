require("dotenv").config();
const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
exports.videoUploads = (file) => {
  return new Promise((resolve) => {
    cloudinary.v2.uploader.upload(
      file,
      { resource_type: "auto" },
      (error, result) => {
        resolve({ url: result.url, id: result.public_id });
      }
    );
  });
};

exports.thumbnailUploads = (file) => {
  return new Promise((resolve) => {
    cloudinary.v2.uploader.upload(
      file,
      { resource_type: "auto" },
      (error, result) => {
        resolve({ url: result.url, id: result.public_id });
      }
    );
  });
};
