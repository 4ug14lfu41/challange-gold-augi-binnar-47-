const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Koneksi ke database MongoDB
mongoose.connect('mongodb://localhost:27017/parkiran', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const kendaraanSchema = new mongoose.Schema({
  platNomor: String,
  jenisKendaraan: String,
  waktuMasuk: { type: Date, default: Date.now },
});

const Kendaraan = mongoose.model('Kendaraan', kendaraanSchema);

// Endpoint untuk mencatat kendaraan masuk
app.post('/masuk', async (req, res) => {
  const { platNomor, jenisKendaraan } = req.body;
  const kendaraan = new Kendaraan({ platNomor, jenisKendaraan });
  await kendaraan.save();
  res.status(201).send(kendaraan);
});

// Endpoint untuk mendapatkan semua kendaraan yang ada di parkiran
app.get('/kendaraan', async (req, res) => {
  const kendaraan = await Kendaraan.find();
  res.send(kendaraan);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
