
const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  name: String,
  path: String,
  comment: String, // Adicione este campo para o comentário
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;

