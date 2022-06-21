const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const path = require('path');
mongoose.pluralize(null);

const PhotoSchema = new Schema({
  title: String,
  description: String,
  image: String,
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const Photo = mongoose.model('Photo', PhotoSchema);

module.exports = Photo;
