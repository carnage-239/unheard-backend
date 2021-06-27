const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const SongSchema =  new Schema({
  artists: [{
    type: String
  }],
  album: {
    type: String
  },
  title: {
    type: String
  },
  source: {
    type: String
  }
});

module.exports = Song = mongoose.model("song", SongSchema);