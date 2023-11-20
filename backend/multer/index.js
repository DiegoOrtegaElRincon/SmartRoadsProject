// app.js (continuación)
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directorio de almacenamiento de archivos
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Nombre del archivo
  },
});

const upload = multer({ storage });

// Resto de la configuración de Express
// ...

app.post('/subir-archivo', upload.single('archivo'), (req, res) => {
  // Acciones después de cargar el archivo
  res.json({ mensaje: 'Archivo subido correctamente' });
});
