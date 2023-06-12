const mongoose = require("mongoose");
let modelSchema = mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  rollnumber: { type: String, unique: true },
  phone: { type: String },
  degree: { type: String },
  image: { type: String, unique: true },
});
let Model = mongoose.model("Students", modelSchema);
module.exports = Model;
