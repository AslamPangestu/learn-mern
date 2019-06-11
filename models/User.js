const mongoose = require("mongoose"); //import mongoose
const Schema = mongoose.Schema; //get class schema from mongoose

//Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

//Create Model
module.exports = User = mongoose.model("user", UserSchema);
