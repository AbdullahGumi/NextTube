const Video = require("../models/videoModel");
cloud = require("../cloudinaryConfig");
module.exports = {
  create: (req, res, nexts) => {
    let video = {
      name: req.files[0].originalname,
      url: req.files[0].path,
      id: "",
      title: "",
      desc: "",
      thumbnail: "",
    };
    Video.find({ name: video.name }, (err, cb) => {
      if (err) {
        res.json({
          error: true,
          message: `There was a problem uploading the video because: ${err.message}`,
        });
      } else {
        let file = {
          name: req.files[0].originalname,
          url: req.files[0].path,
          id: "",
          title: "",
          desc: "",
          thumbnail: "",
        };
        cloud
          .uploads(file.url)
          .then((result) => {
            Video.create({
              name: req.files[0].originalname,
              url: result.url,
              id: result.id,
              title: result.title,
              desc: result.desc,
              thumbnail: result.thumbnail,
            });
          })
          .then((result) => {
            res.json({
              message: "Added successfully",
              data: result,
            });
          })
          .catch((err) => {
            res.json({
              error: true,
              message: err.message,
            });
          });
      }
    });
  },
};
