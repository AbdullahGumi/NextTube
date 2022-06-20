const mongoose = require("mongoose");
const User = require("./User");
const Schema = mongoose.Schema;

const VideoSchema = new Schema(
  {
    user: {
      type: Schema.Types.String,
      ref: User,
    },
    title: { type: String, required: true },
    desc: { type: String },
    video: { type: String, required: true },
    thumbnail: { type: String },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    profilePic: { type: String, required: true },
  },
  { timestamps: true }
);

mongoose.models = {};
module.exports = mongoose.model("video", VideoSchema);
