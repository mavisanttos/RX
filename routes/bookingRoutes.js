const express = require('express');
const router = express.Router();

let bookings = [
  { booking_id: 1, user_id: 1, room_id: 1, date: '2025-05-24', time_slot_id: 1, status: 'reservado' },
];

// Listar todos
router.get('/', (req, res) => res.json(bookings));

// Buscar por ID
router.get('/:id', (req, res) => {
  const booking = bookings.find(b => b.booking_id === +req.params.id);
  if (!booking) return res.status(404).json({ message: 'Reserva não encontrada' });
  res.json(booking);
});

// Criar
router.post('/', (req, res) => {
  const { user_id, room_id, date, time_slot_id, status } = req.body;
  if (!user_id || !room_id || !date || !time_slot_id) return res.status(400).json({ message: 'Campos obrigatórios: user_id, room_id, date, time_slot_id' });
  const newBooking = {
    booking_id: bookings.length ? bookings[bookings.length - 1].booking_id + 1 : 1,
    user_id,
    room_id,
    date,
    time_slot_id,
    status: status || 'reservado',
  };
  bookings.push(newBooking);
  res.status(201).json(newBooking);
});

// Atualizar
router.put('/:id', (req, res) => {
  const booking = bookings.find(b => b.booking_id === +req.params.id);
  if (!booking) return res.status(404).json({ message: 'Reserva não encontrada' });
  const { user_id, room_id, date, time_slot_id, status } = req.body;
  if (user_id) booking.user_id = user_id;
  if (room_id) booking.room_id = room_id;
  if (date) booking.date = date;
  if (time_slot_id) booking.time_slot_id = time_slot_id;
  if (status) booking.status = status;
  res.json(booking);
});

// Deletar
router.delete('/:id', (req, res) => {
  const idx = bookings.findIndex(b => b.booking_id === +req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Reserva não encontrada' });
  bookings.splice(idx, 1);
  res.json({ message: 'Reserva deletada' });
});

module.exports = router;
