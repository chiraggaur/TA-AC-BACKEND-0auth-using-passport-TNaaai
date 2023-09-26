var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    name: { type: String },
    username: { type: String, required: true, unique: true },
    profileUrl: { type: String, required: true, unique: true },
    photo: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
