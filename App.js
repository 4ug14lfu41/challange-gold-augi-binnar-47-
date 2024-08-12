import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [platNomor, setPlatNomor] = useState('');
  const [jenisKendaraan, setJenisKendaraan] = useState('');
  const [kendaraan, setKendaraan] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:3000/masuk', {
      platNomor,
      jenisKendaraan,
    });
    setKendaraan([...kendaraan, response.data]);
  };

  useEffect(() => {
    const fetchKendaraan = async () => {
      const response = await axios.get('http://localhost:3000/kendaraan');
      setKendaraan(response.data);
    };
    fetchKendaraan();
  }, []);

  return (
    <div>
      <h1>Parkiran</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Plat Nomor"
          value={platNomor}
          onChange={(e) => setPlatNomor(e.target.value)}
        />
        <input
          type="text"
          placeholder="Jenis Kendaraan"
          value={jenisKendaraan}
          onChange={(e) => setJenisKendaraan(e.target.value)}
        />
        <button type="submit">Masuk</button>
      </form>

      <h2>Daftar Kendaraan di Parkiran</h2>
      <ul>
        {kendaraan.map((k, index) => (
          <li key={index}>
            {k.platNomor} - {k.jenisKendaraan} (Masuk: {new Date(k.waktuMasuk).toLocaleString()})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
