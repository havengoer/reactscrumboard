const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storyModel = new Schema({
  boardId: { type: String, required: true },
  name: { type: String, required: true },
  done: { type: Boolean, required: true },
});

module.exports = mongoose.model('Story', storyModel);
