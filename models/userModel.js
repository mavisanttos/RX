const pool = require('../config/db');

// ─────────── CRUD ─────────────────────────────────────────────────────────────
const findAll  = async () => (await pool.query('SELECT * FROM users ORDER BY user_id')).rows;

const findById = async id =>
  (await pool.query('SELECT * FROM users WHERE user_id = $1', [id])).rows[0];

const create = async ({ name, email, class: userClass, group_number, google_id }) =>
  (await pool.query(
    `INSERT INTO users (name, email, class, group_number, google_id)
       VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [name, email, userClass, group_number, google_id]
  )).rows[0];

const update = async (id, { name, email, class: userClass, group_number, google_id }) =>
  (await pool.query(
    `UPDATE users
        SET name         = $1,
            email        = $2,
            class        = $3,
            group_number = $4,
            google_id    = $5
      WHERE user_id      = $6
    RETURNING *`,
    [name, email, userClass, group_number, google_id, id]
  )).rows[0];

const remove = async id =>
  (await pool.query('DELETE FROM users WHERE user_id = $1', [id])).rowCount > 0;

module.exports = { findAll, findById, create, update, remove };