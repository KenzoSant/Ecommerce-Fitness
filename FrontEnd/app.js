import express from 'express';
import multer from 'multer';
import cors from 'cors';
import moment from 'moment-timezone';
const app = express();
const port = 3000;

const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

const brazilTime = moment.tz(Date.now(), 'America/Sao_Paulo').format('YYYY-MM-DD-HH-mm');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/assets/');
  },
  filename: function (req, file, cb) {
    cb(null, `${brazilTime}_${file.originalname}` );
  }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), (req, res) => {
  res.status(200).json({ message: 'Imagem enviada com sucesso!' });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
