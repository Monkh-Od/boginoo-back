const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UrlSchema = new Schema({
  original: String,
  short: String,
  ownerId: String,
});

const Url = mongoose.model("urls", UrlSchema);

module.exports = Url;
