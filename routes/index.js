const express = require('express');
const router = express.Router();

// Importação das rotas
const userRoutes = require('./userRoutes');
const roomRoutes = require('./roomRoutes');
const timeRoutes = require('./predefinedTimeRoutes');
const bookingRoutes = require('./bookingRoutes');

// Definição das rotas base
router.use('/users', userRoutes);
router.use('/rooms', roomRoutes);
router.use('/times', timeRoutes);
router.use('/bookings', require('./bookingRoutes'));

// Rota raiz da API
router.get('/', (req, res) => {
  res.json({ message: 'RX API v1' });
});

module.exports = router;