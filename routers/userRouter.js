const express = require("express");

const userModel=require("../models/userModel");

const userRouter = express.Router();

const verifyUser=require("./verify");

userRouter
  .get("/getUser",verifyUser, getUser)
  .get("/createUser",verifyUser, createUser)
  .patch("/updateUser",verifyUser, updateUser)
  .delete("/deleteUser",verifyUser, deleteUser);

userRouter.route("/:id").get(getUserById);

// -------------User-functions-----------

async function getUser(req, res,next) {
  try {
    let users = await userModel.find({});
    console.log(users);
    return res
      .status(200)
      .json({ message: "users fetched successfully", user: users });
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ message: "users cannot be fetched", error: error });
  }
}

function createUser(req, res) {
  console.log("req.data", req.body);
  user = req.body;
  res.status(200).send("data recieved and user added ");
}

async function updateUser(req, res) {
  try {
    let result = await userModel.findOneAndUpdate(
      req.body.email,
      req.body.update
    );
    console.log(result);
    return res
      .status(200)
      .json({ message: "user updated successfully", result: result });
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ message: "user updation failed", result: result });
  }
}

async function deleteUser(req, res) {
  try {
    let result = await userModel.findOneAndDelete({ email: req.body.email });
    console.log(result);
    return res
      .status(200)
      .json({ message: "user deleted successfully", result: result });
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ message: "user could not be deleted", error: error });
  }
}

async function getUserById(req, res) {
  try {
    let user = await userModel.findOne({ email: req.params.id });
    console.log(user);
    return res
      .status(200)
      .json({ message: "user fetched by id successfully", user: user });
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ message: "user cannot be fetched by id", error: error });
  }
}

module.exports = userRouter;
