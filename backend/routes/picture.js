
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Image = require('../models/image');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Rota POST para fazer o upload de uma imagem com comentário
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const { filename, path } = req.file;
    const { comment } = req.body; // Adicione esta linha para obter o comentário do corpo da requisição

    const image = new Image({ name: filename, path, comment });
    await image.save();

    res.status(201).json({ success: true, message: 'Imagem enviada com sucesso!' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Rota GET para obter todas as imagens
router.get('/images', async (req, res) => {
  try {
    const images = await Image.find();
    res.json({ success: true, images });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Rota DELETE para excluir uma imagem pelo ID
router.delete('/images/:id', async (req, res) => {
  try {
    const deletedImage = await Image.findByIdAndDelete(req.params.id);

    if (!deletedImage) {
      return res.status(404).json({ success: false, message: 'Imagem não encontrada.' });
    }

    const filePath = path.join(__dirname, '../uploads/', deletedImage.name);
    fs.unlinkSync(filePath);

    res.json({ success: true, message: 'Imagem excluída com sucesso!' });
  } catch (error) {
    console.error('Erro ao excluir imagem:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
