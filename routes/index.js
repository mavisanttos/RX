const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');
const ReservaController = require('../controllers/ReservaController');

// Rotas de Usuário
router.post('/usuarios', UsuarioController.criarUsuario);
router.get('/usuarios/:id', UsuarioController.buscarUsuario);

// Rotas de Reserva
router.post('/reservas', ReservaController.criarReserva);
router.get('/reservas', ReservaController.listarReservas);
router.put('/reservas/:id/cancelar', ReservaController.cancelarReserva);

module.exports = router;