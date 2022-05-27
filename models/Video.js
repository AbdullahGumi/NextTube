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
    video: { type: String },
    thumbnail: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Video", videoSchema);
