const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema1 = new Schema({
  username: {
    type: String,
    required: true,
    min: 4,
    max: 15
  },
  email: {
    type: String,
    required: true,
    min: 5
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 15
  }
});

const authPracticeDB = mongoose.connection.useDb("auth_practice_DB");

const User1 = authPracticeDB.model("User1", userSchema1);

module.exports = User1;
