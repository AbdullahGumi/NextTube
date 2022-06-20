const UserModel = require("../models/User");

class UserDao {
  constructor() {}
  addNew(obj) {
    return new Promise(async (resolve, reject) => {
      const userExists = await UserModel.findOne({ username: obj.username });
      if (userExists === null) {
        let user = new UserModel(obj);
        user.save((err, user) => {
          err ? reject(err) : resolve(user);
        });
      } else {
        console.log("user already exists");
      }
    });
  }

  // getAll() {
  //   return new Promise((resolve, reject) => {
  //     UserModel.find({}, (err, allVideos) => {
  //       if (err) {
  //         reject(err);
  //       }
  //       resolve(allVideos);
  //     });
  //   });
  // }

  getUser(username) {
    return new Promise((resolve, reject) => {
      UserModel.findOne({ username: username }, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  }

  subscribe(id, increment) {
    return new Promise((resolve, reject) => {
      UserModel.findOneAndUpdate(
        id,
        {
          $inc: { subscribers: increment ? 1 : -1 },
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

module.exports = new UserDao();
