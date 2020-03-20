const express = require("express");
const errorhandler = require("errorhandler");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("Hello World!"));

app.use(errorhandler());

// app.use((err, req, res, next) => {});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
