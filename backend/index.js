const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const dotenv = require("dotenv");

const userRouter1 = require("./routes/user.router.v1");
const userRouter2 = require("./routes/user.router.v2");

// configure dotenv to access environment variable
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// connect server to mongoDB Atlas
const URI = process.env.ATLAS_DB_URI;
mongoose.connect(URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongoose database connection established successfully");
});

connection.on("error", function(err) {
  console.log("Mongoose default connection error: " + err);
});

// use several middleware
app.use(cookieParser(process.env.COOKIE_SECRET_KEY));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => res.send("Hello World!"));

app.use("/api/v1/users", userRouter1);
app.use("/api/v2/users", userRouter2);

// error handler
app.use((err, req, res, next) => {
  res.statusCode = err.status || 500;
  res.setHeader("Content-Type", "application/json");
  console.log(err);
  res.json(
    err.message && err.status
      ? { message: err.message }
      : { message: "Internal Server Error" }
  );
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
