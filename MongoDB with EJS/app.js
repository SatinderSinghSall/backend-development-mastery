const express = require("express");
const path = require("path");
const app = express();

const userModel = require("./models/user.model");

const PORT = 3000;

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Home
app.get("/", (req, res) => {
  res.redirect("/create-user");
});

// Create User page
app.get("/create-user", (req, res) => {
  res.render("index");
});

// Save User
app.post("/create-user", async (req, res) => {
  try {
    const { name, email, image } = req.body;

    await userModel.create({
      name,
      email,
      image,
    });

    res.redirect("/read-user");
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Failed to create user.");
  }
});

// Read Users
app.get("/read-user", async (req, res) => {
  try {
    const users = await userModel.find();
    res.render("read", { users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Failed to fetch users.");
  }
});

// Delete User:
app.post("/delete-user/:id", async (req, res) => {
  try {
    const deletedUser = await userModel.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).send("User not found.");
    }

    res.redirect("/read-user");
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(400).send("Failed to delete user.");
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
