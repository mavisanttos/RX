const pool = require('../config/database');

module.exports = {
  async criar(usuario) {
    const { nome, email, classe, grupo, google_id } = usuario;
    const query = `
      INSERT INTO users (name, email, class, group_number, google_id)
      VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const values = [nome, email, classe, grupo, google_id];
    
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async buscarPorId(id) {
    const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [id]);
    return result.rows[0];
  },

  async buscarPorEmail(email) {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  }
};