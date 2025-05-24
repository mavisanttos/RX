const pool = require('../config/db');

// lista JOIN já resolve nomes de sala e usuário
const findAll = async () => (await pool.query(`
  SELECT b.*, u.name       AS user_name,
         r.room_number     AS room_number,
         pt.start_time, pt.end_time
    FROM bookings b
    JOIN users            u  ON u.user_id   = b.user_id
    JOIN rooms            r  ON r.room_id   = b.room_id
    JOIN predefined_times pt ON pt.time_slot_id = b.time_slot_id
ORDER BY b.booking_id
`)).rows;

const findById = async id => (await pool.query(`
  SELECT * FROM bookings WHERE booking_id = $1
`, [id])).rows[0];

const create = async ({ user_id, room_id, date, time_slot_id, status = 'reservado' }) =>
  (await pool.query(`
    INSERT INTO bookings
      (user_id, room_id, date, time_slot_id, status)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `, [user_id, room_id, date, time_slot_id, status])).rows[0];

const update = async (id, { status }) =>
  (await pool.query(`
    UPDATE bookings
       SET status = $1
     WHERE booking_id = $2
  RETURNING *
  `, [status, id])).rows[0];

const remove = async id =>
  (await pool.query('DELETE FROM bookings WHERE booking_id = $1', [id])).rowCount > 0;

module.exports = { findAll, findById, create, update, remove };
