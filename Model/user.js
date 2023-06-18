const mongoose = require("mongoose");
const { Schema } = mongoose;

const user = new Schema({
  fullname: String,
  email: String,
  password: String,
  confirm: String,
  DOB: {
    type: Date,
    default: Date.now
  },
  PhoneNO: Number,
  Security: String,
  Address: String,
  City: String,
  State: String,
  Zipcode: Number,
  Country: String
});

const User = mongoose.model("User", user);

module.exports = User;
