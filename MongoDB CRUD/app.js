const express = require("express");
const app = express();

const userModel = require("./userModel");

const PORT = 3000;

app.get("/", (req, res) => {
  res.send(`Server is running on port: ${PORT}`);
});

app.get("/create", async (req, res) => {
  let createdUser = await userModel.create({
    name: "Nick Nelson",
    email: "nicknelson@gmail.com",
    username: "nicknelson",
  });

  res.send(createdUser);
});

app.get("/update", async (req, res) => {
  const updatedUser = await userModel.findOneAndUpdate(
    { username: "satindersinghsall" },
    { name: "Vaibhav Soni" },
    { new: true },
  );

  res.send(updatedUser);
});

app.get("/read", async (req, res) => {
  let users = await userModel.find();

  res.send(users);
});

app.get("/read/user", async (req, res) => {
  let user = await userModel.findOne({ username: "nicknelson" });

  res.send(user);
});

app.get("/delete/user", async (req, res) => {
  let user = await userModel.findOneAndDelete({ username: "nicknelson" });

  res.send(user);
});

app.listen(PORT);
