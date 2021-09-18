const mongoose = require("mongoose");
const emailValidator = require("email-validator");
require("dotenv").config();

mongoose
  .connect(process.env.DB_LINK)
  .then((db) => {
    // console.log(db);
    console.log("connected to db successfully");
  })
  .catch((err) => {
    console.log(err);
  });

//User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: function () {
      return emailValidator.validate(this.email);
    },
  },
  age: { type: Number },
  password: { type: String, required: true },
  confirmPassword: {
    type: String,
    required: true,
    validate: function () {
      return this.password == this.confirmPassword;
    },
  },
});

userSchema.pre("save", () => {
  //prevents confirmPassword from getting saved into the database
  // console.log("inside pre");
  this.confirmPassword = undefined;
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
