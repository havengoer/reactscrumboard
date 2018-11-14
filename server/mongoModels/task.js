const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskModel = new Schema({
   boardId: { type: String, required: true },
   status: { type: String, required: true },
   name: { type: String, required: true },
});

module.exports = mongoose.model('Task', taskModel);