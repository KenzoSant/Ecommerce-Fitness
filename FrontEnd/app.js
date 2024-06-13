import express from 'express';
import multer from 'multer';
import path from 'path';

const app = express();
const port = 3000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/assets/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), (req, res) => {
  res.status(200).json({ message: 'Imagem enviada com sucesso!' });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
