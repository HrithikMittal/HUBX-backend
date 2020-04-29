const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
var app = express();
dotenv.config();

var user = require("./routes/User");
var event = require("./routes/Event");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database is connected Successfully");
  })
  .catch((err) => {
    console.log("Error is ", err.message);
  });

const data = require("./home.json");
app.get("/", (req, res) => {
  res.json(data);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/user", user);
app.use("/event", event);

var port = process.env.PORT || 8800;
app.listen(port, () => {
  console.log(`Server is listening on PORT:${port}`);
});
