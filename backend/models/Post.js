

const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  content: { type: String, required: true },
  img: { type: String, default: '' },
  datePosted: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Post', postSchema);
