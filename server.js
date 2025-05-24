const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rotas
app.use('/api', routes);

// Rota de teste
app.get('/', (req, res) => {
  res.send('Sistema de Reservas de Salas');
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo quebrou!');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});