const Booking = require('../models/bookingModel');

exports.getAll   = async (_, res) => {
  try { res.json(await Booking.findAll()); }
  catch (e) { res.status(500).json({ error: e.message }); }
};

exports.getById  = async ({ params }, res) => {
  try {
    const data = await Booking.findById(params.id);
    if (!data) return res.status(404).json({ message: 'Booking not found' });
    res.json(data);
  } catch (e) { res.status(500).json({ error: e.message }); }
};

exports.create   = async ({ body }, res) => {
  try { res.status(201).json(await Booking.create(body)); }
  catch (e) { res.status(500).json({ error: e.message }); }
};

exports.update   = async ({ params, body }, res) => {
  try {
    const updated = await Booking.update(params.id, body);
    if (!updated) return res.status(404).json({ message: 'Booking not found' });
    res.json(updated);
  } catch (e) { res.status(500).json({ error: e.message }); }
};

exports.remove   = async ({ params }, res) => {
  try {
    const ok = await Booking.remove(params.id);
    if (!ok) return res.status(404).json({ message: 'Booking not found' });
    res.json({ message: 'Booking deleted' });
  } catch (e) { res.status(500).json({ error: e.message }); }
};
