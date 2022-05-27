const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  email: { type: String, required: true, index: { unique: true } },
  username: { type: String, require: true },
  password: { type: String, required: true },
  videos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
    },
  ],
});

UserSchema.pre("save", function (next) {
  let me = this;
  const salt = bcrypt.genSaltSync();
  bcrypt.hash(me.password, salt, (err, encrypted) => {
    if (err) {
      console.log("Bcrypt User Model Password encryption Error", err);
      next();
    } else {
      me.password = encrypted;
      next();
    }
  });
});

module.exports = mongoose.model("User", UserSchema);
