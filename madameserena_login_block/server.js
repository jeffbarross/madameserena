
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.static('public'));
app.use(express.json());

app.get('/api/bloqueios', (req, res) => {
  const data = fs.existsSync('./bloqueios.json') ? fs.readFileSync('./bloqueios.json') : '[]';
  res.json(JSON.parse(data));
});

app.post('/api/bloquear', (req, res) => {
  const data = req.body.data;
  const arquivo = './bloqueios.json';
  const bloqueios = fs.existsSync(arquivo) ? JSON.parse(fs.readFileSync(arquivo)) : [];
  const index = bloqueios.indexOf(data);
  if (index === -1) {
    bloqueios.push(data);
  } else {
    bloqueios.splice(index, 1);
  }
  fs.writeFileSync(arquivo, JSON.stringify(bloqueios, null, 2));
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
