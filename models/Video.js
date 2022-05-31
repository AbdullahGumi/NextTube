const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSchema = new Schema(
  {
    // user_id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    // },
    title: { type: String, required: true },
    desc: { type: String },
    video: { type: String, required: true },
    thumbnail: { type: String },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

mongoose.models = {};
module.exports = mongoose.model("Video", videoSchema);
