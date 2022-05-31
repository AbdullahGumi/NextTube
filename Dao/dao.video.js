const videoModel = require("../models/Video");
class VideoDao {
  constructor() {}
  addNew(obj) {
    return new Promise((resolve, reject) => {
      let video = new videoModel(obj);
      video.save((err, savedVideo) => {
        if (err) {
          reject(err);
          console.log("error: ", err);
        }
        resolve(savedVideo);
      });
    });
  }

  getAll() {
    return new Promise((resolve, reject) => {
      videoModel.find({}, (err, allVideos) => {
        if (err) {
          reject(err);
        }
        resolve(allVideos);
      });
    });
  }

  getVideo(id) {
    return new Promise((resolve, reject) => {
      videoModel.findById(id, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  }

  likeVideo(id, increment) {
    return new Promise((resolve, reject) => {
      videoModel.findByIdAndUpdate(
        id,
        {
          $inc: { likes: increment ? 1 : -1 },
        },
        { new: true },
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  }

  dislikeVideo(id) {
    return new Promise((resolve, reject) => {
      videoModel.findByIdAndUpdate(
        id,
        {
          $inc: { dislikes: 1 },
        },
        { new: true },
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  }

  increaseViews(id) {
    return new Promise((resolve, reject) => {
      videoModel.findByIdAndUpdate(
        id,
        {
          $inc: { views: 1 },
        },
        { new: true },
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  }
}

module.exports = new VideoDao();
