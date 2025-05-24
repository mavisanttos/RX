const express = require('express');
const router = express.Router();

let times = [
  { time_slot_id: 1, start_time: '07:00:00', end_time: '08:00:00' },
];

// Listar todos
router.get('/', (req, res) => res.json(times));

// Buscar por ID
router.get('/:id', (req, res) => {
  const time = times.find(t => t.time_slot_id === +req.params.id);
  if (!time) return res.status(404).json({ message: 'Horário não encontrado' });
  res.json(time);
});

// Criar
router.post('/', (req, res) => {
  const { start_time, end_time } = req.body;
  if (!start_time || !end_time) return res.status(400).json({ message: 'start_time e end_time são obrigatórios' });
  const newTime = {
    time_slot_id: times.length ? times[times.length - 1].time_slot_id + 1 : 1,
    start_time,
    end_time,
  };
  times.push(newTime);
  res.status(201).json(newTime);
});

// Atualizar
router.put('/:id', (req, res) => {
  const time = times.find(t => t.time_slot_id === +req.params.id);
  if (!time) return res.status(404).json({ message: 'Horário não encontrado' });
  const { start_time, end_time } = req.body;
  if (start_time) time.start_time = start_time;
  if (end_time) time.end_time = end_time;
  res.json(time);
});

// Deletar
router.delete('/:id', (req, res) => {
  const idx = times.findIndex(t => t.time_slot_id === +req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Horário não encontrado' });
  times.splice(idx, 1);
  res.json({ message: 'Horário deletado' });
});

module.exports = router;
