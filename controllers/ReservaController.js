const Reserva = require('../models/Reserva');

exports.criarReserva = async (req, res) => {
  try {
    const novaReserva = await Reserva.criar(req.body);
    res.status(201).json(novaReserva);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.listarReservas = async (req, res) => {
  try {
    const reservas = await Reserva.listarPorUsuario(req.user.id);
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.cancelarReserva = async (req, res) => {
  try {
    const reserva = await Reserva.cancelar(req.params.id);
    if (!reserva) {
      return res.status(404).json({ message: 'Reserva não encontrada' });
    }
    res.json(reserva);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};