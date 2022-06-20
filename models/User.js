const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  subscribers: { type: Number, default: 0 },
  videos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
    },
  ],
});

mongoose.models = {};
module.exports = mongoose.model("User", UserSchema);
