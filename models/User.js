const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    unique: false,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    unique: false,
    required: true,
  },
  songs: [
    {
      artists: [String],
      album: String,
      title: String,
      source: String,
    },
  ],
});

var options = {
  usernameField: "email",
  errorMessages: {
    UserExistsError: "Email already exists",
    IncorrectUsernameError: "Email does not exist",
    IncorrectPasswordError: "Please check your password",
  },
};

UserSchema.plugin(passportLocalMongoose, options);

module.exports = User = mongoose.model("user", UserSchema);
