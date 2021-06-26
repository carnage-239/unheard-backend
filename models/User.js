const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  user_id: { type: String },
  songs: {
    type: [{ type: String }],
  },
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
