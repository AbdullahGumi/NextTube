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

  //   getAll() {
  //     return new Promise((resolve, reject) => {
  //       videoModel.find({}, (err, allVideos) => {
  //         if (err) {
  //           reject(err);
  //         }
  //         resolve(allVideos);
  //       });
  //     });
  //   }

  //   getAllByName() {
  //     return new Promise((resolve, reject) => {
  //       videoModel.findOne({}, (err, allVideos) => {
  //         if (err) {
  //           reject(err);
  //         }
  //         resolve(allVideos);
  //       });
  //     });
  //   }

  //   update(id, title, desc, thumbnail, publics, year) {
  //     return new Promise((resolve, reject) => {
  //       videoModel.findByIdAndUpdate(
  //         id,
  //         {
  //           $set: { title, desc, thumbnail, publics, year },
  //         },
  //         { new: true },
  //         (err, video) => {
  //           if (err) {
  //             reject(err);
  //           }
  //           resolve(video);
  //         }
  //       );
  //     });
  //   }

  //   get(id) {
  //     return new Promise((resolve, reject) => {
  //       videoModel.findById(
  //         (id,
  //         (err, result) => {
  //           if (err) {
  //             reject(err);
  //           }
  //           resolve(result);
  //         })
  //       );
  //     });
  //   }

  //   del(id) {
  //     return new Promise((resolve, reject) => {
  //       videoModel.findByIdAndRemove(id, (err, result) => {
  //         if (err) {
  //           reject(err);
  //         }
  //         resolve("Like Deleted Successfully!");
  //       });
  //     });
  //   }
}

module.exports = new VideoDao();
