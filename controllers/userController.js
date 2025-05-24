const User = require('../models/userModel');

exports.getAll   = async (_, res) => {
  try { res.json(await User.findAll()); }
  catch (e) { res.status(500).json({ error: e.message }); }
};

exports.getById  = async ({ params }, res) => {
  try {
    const data = await User.findById(params.id);
    if (!data) return res.status(404).json({ message: 'User not found' });
    res.json(data);
  } catch (e) { res.status(500).json({ error: e.message }); }
};

exports.create   = async ({ body }, res) => {
  try { res.status(201).json(await User.create(body)); }
  catch (e) { res.status(500).json({ error: e.message }); }
};

exports.update   = async ({ params, body }, res) => {
  try {
    const updated = await User.update(params.id, body);
    if (!updated) return res.status(404).json({ message: 'User not found' });
    res.json(updated);
  } catch (e) { res.status(500).json({ error: e.message }); }
};

exports.remove   = async ({ params }, res) => {
  try {
    const ok = await User.remove(params.id);
    if (!ok) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (e) { res.status(500).json({ error: e.message }); }
};
