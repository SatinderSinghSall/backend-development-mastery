const express = require("express");
const path = require("path");
const app = express();

const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ express: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send(`Backend server API running on port ${PORT}`);
});

app.get("/create", (req, res) => {
  res.render("index");
});

app.get("/read", (req, res) => {
  res.render("read");
});

app.listen(PORT, () => {
  console.log(`Backend server API running on port ${PORT}`);
});
