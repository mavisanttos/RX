const pool = require('../config/db');

const findAll = async () =>
  (await pool.query('SELECT * FROM predefined_times ORDER BY start_time')).rows;

const findById = async id =>
  (await pool.query('SELECT * FROM predefined_times WHERE time_slot_id = $1', [id])).rows[0];

module.exports = { findAll, findById };