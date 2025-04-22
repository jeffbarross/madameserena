
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

// Rotas de leitura
app.get('/api/agendamentos', (req, res) => {
  const data = fs.readFileSync('./agendamentos.json');
  res.json(JSON.parse(data));
});

app.get('/api/bloqueios', (req, res) => {
  const data = fs.readFileSync('./bloqueios.json');
  res.json(JSON.parse(data));
});

// Salvar novo agendamento
app.post('/api/agendar', (req, res) => {
  const data = JSON.parse(fs.readFileSync('./agendamentos.json'));
  data.push(req.body);
  fs.writeFileSync('./agendamentos.json', JSON.stringify(data, null, 2));
  res.json({ status: 'ok' });
});

// Bloquear/desbloquear data
app.post('/api/bloquear', (req, res) => {
  const bloqueios = JSON.parse(fs.readFileSync('./bloqueios.json'));
  const data = req.body.data;
  const index = bloqueios.indexOf(data);
  if (index === -1) {
    bloqueios.push(data);
  } else {
    bloqueios.splice(index, 1);
  }
  fs.writeFileSync('./bloqueios.json', JSON.stringify(bloqueios, null, 2));
  res.json({ status: 'ok' });
});

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
