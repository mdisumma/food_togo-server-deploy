import User from "../models/user.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const client = mongoose
  .connect(process.env.URI, { dbName: process.env.DB_NAME })
  .then(() => console.log("Mongose - user connection is ready"))
  .catch((error) => console.log(error));

const UserRouter = (app) => {
  app.get(`/userList`, async (request, response) => {
    const userList = await User.find().select("-password");
    if (!userList) {
      response.status(400).json({ success: false });
    }
    response.status(200).send(userList);
  });

  app.get(`/userById/:id`, async (request, response) => {
    const user = await User.findById(request.params.id).select("-password");
    if (!user) {
      response.status(500).json({ success: false, message: "user not found" });
    }
    response.status(200).send(user);
  });

  app.post(`/userByUserName`, async (request, response) => {
    const user = await User.findOne({ userName: request.body.userName });
    console.log(user);
    if (!user) {
      response.status(400).json({ success: false, message: "user not found" });
      return;
    }
    if (user) {
      response.status(200).send(user);
    }
  });

  app.post(`/login`, async (request, response) => {
    const user = await User.findOne({ userName: request.body.userName });
    console.log(user);
    if (!user) {
      response.status(400).json({ success: false, message: "user not found" });
      return;
    }
    if (user.password === request.body.password) {
      response.status(200).json({
        userName: user.userName,
        password: user.password,
        message: "user autenticated",
      });
    } else {
      response
        .status(400)
        .json({ success: false, message: "password is wrong" });
    }
  });

  app.post("/userInsertNew", async (request, response) => {
    let user = new User({
      userName: request.body.userName,
      email: request.body.email,
      password: request.body.password,
      address: request.body.address,
      city: request.body.city,
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      postcode: request.body.postcode,
      cardName: request.body.cardName,
      cardNumber: request.body.cardNumber,
    });
    user = await user.save();
    if (!user) return response.status(500).send("user can not be created");

    response.status(200).json(user);
  });
  app.put("/updateUserById/:id", async (request, response) => {
    const user = await User.findByIdAndUpdate(
      request.params.id,
      {
        userName: request.body.userName,
        email: request.body.email,
        password: request.body.password,
        address: request.body.address,
        city: request.body.city,
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        postcode: request.body.postcode,
        cardName: request.body.cardName,
        cardNumber: request.body.cardNumber,
      },
      { new: true }
    );
    console.log(user);
    if (!user) return response.status(400).send("the user cannot be updated!");
    response.send(user);
  });
};

export default UserRouter;
