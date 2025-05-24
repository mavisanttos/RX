const Time = require('../models/predefinedTimeModel');

exports.getAll  = async (_, res) => {
  try { res.json(await Time.findAll()); }
  catch (e) { res.status(500).json({ error: e.message }); }
};

exports.getById = async ({ params }, res) => {
  try {
    const data = await Time.findById(params.id);
    if (!data) return res.status(404).json({ message: 'Time slot not found' });
    res.json(data);
  } catch (e) { res.status(500).json({ error: e.message }); }
};
