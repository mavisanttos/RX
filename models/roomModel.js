const pool = require('../config/db');

const findAll  = async () => (await pool.query('SELECT * FROM rooms ORDER BY room_id')).rows;

const findById = async id =>
  (await pool.query('SELECT * FROM rooms WHERE room_id = $1', [id])).rows[0];

const create = async ({ room_number, location }) =>
  (await pool.query(
    `INSERT INTO rooms (room_number, location)
       VALUES ($1, $2)
     RETURNING *`,
    [room_number, location]
  )).rows[0];

const update = async (id, { room_number, location }) =>
  (await pool.query(
    `UPDATE rooms
        SET room_number = $1,
            location    = $2
      WHERE room_id     = $3
    RETURNING *`,
    [room_number, location, id]
  )).rows[0];

const remove = async id =>
  (await pool.query('DELETE FROM rooms WHERE room_id = $1', [id])).rowCount > 0;

module.exports = { findAll, findById, create, update, remove };
