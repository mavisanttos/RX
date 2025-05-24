const express = require('express');
const router = express.Router();

let rooms = [
  { room_id: 1, room_number: '101', location: 'Prédio A' },
];

// Listar todos
router.get('/', (req, res) => res.json(rooms));

// Buscar por ID
router.get('/:id', (req, res) => {
  const room = rooms.find(r => r.room_id === +req.params.id);
  if (!room) return res.status(404).json({ message: 'Sala não encontrada' });
  res.json(room);
});

// Criar
router.post('/', (req, res) => {
  const { room_number, location } = req.body;
  if (!room_number) return res.status(400).json({ message: 'Número da sala é obrigatório' });
  const newRoom = {
    room_id: rooms.length ? rooms[rooms.length - 1].room_id + 1 : 1,
    room_number,
    location: location || '',
  };
  rooms.push(newRoom);
  res.status(201).json(newRoom);
});

// Atualizar
router.put('/:id', (req, res) => {
  const room = rooms.find(r => r.room_id === +req.params.id);
  if (!room) return res.status(404).json({ message: 'Sala não encontrada' });
  const { room_number, location } = req.body;
  if (room_number) room.room_number = room_number;
  if (location) room.location = location;
  res.json(room);
});

// Deletar
router.delete('/:id', (req, res) => {
  const idx = rooms.findIndex(r => r.room_id === +req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Sala não encontrada' });
  rooms.splice(idx, 1);
  res.json({ message: 'Sala deletada' });
});

module.exports = router;
