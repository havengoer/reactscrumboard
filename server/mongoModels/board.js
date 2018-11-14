const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boardModel = new Schema({
   userId: { type: String, required: true },
   name: { type: String, required: true },
});

module.exports = mongoose.model('Board', boardModel);