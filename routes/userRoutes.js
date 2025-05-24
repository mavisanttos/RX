const express = require('express');
const router = express.Router();

let users = [
  { user_id: 1, name: 'João', email: 'joao@email.com', class: 'A1', group_number: 1, google_id: '123' },
];

// Listar todos
router.get('/', (req, res) => res.json(users));

// Buscar por ID
router.get('/:id', (req, res) => {
  const user = users.find(u => u.user_id === +req.params.id);
  if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
  res.json(user);
});

// Criar
router.post('/', (req, res) => {
  const { name, email, class: userClass, group_number, google_id } = req.body;
  if (!name || !email) return res.status(400).json({ message: 'Nome e email são obrigatórios' });
  const newUser = {
    user_id: users.length ? users[users.length - 1].user_id + 1 : 1,
    name, email, class: userClass || '', group_number: group_number || null, google_id: google_id || null,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Atualizar
router.put('/:id', (req, res) => {
  const user = users.find(u => u.user_id === +req.params.id);
  if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
  const { name, email, class: userClass, group_number, google_id } = req.body;
  if (name) user.name = name;
  if (email) user.email = email;
  if (userClass) user.class = userClass;
  if (group_number !== undefined) user.group_number = group_number;
  if (google_id) user.google_id = google_id;
  res.json(user);
});

// Deletar
router.delete('/:id', (req, res) => {
  const idx = users.findIndex(u => u.user_id === +req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Usuário não encontrado' });
  users.splice(idx, 1);
  res.json({ message: 'Usuário deletado' });
});

module.exports = router;
