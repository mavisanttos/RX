const pool = require('../config/database');

module.exports = {
  async criar(reserva) {
    const { usuario_id, sala_id, data, horario_id } = reserva;
    const query = `
      INSERT INTO bookings (user_id, room_id, date, time_slot_id)
      VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [usuario_id, sala_id, data, horario_id];
    
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async listarPorUsuario(usuario_id) {
    const query = `
      SELECT b.*, r.room_number, p.start_time, p.end_time 
      FROM bookings b
      JOIN rooms r ON b.room_id = r.room_id
      JOIN predefined_times p ON b.time_slot_id = p.time_slot_id
      WHERE b.user_id = $1`;
    
    const result = await pool.query(query, [usuario_id]);
    return result.rows;
  },

  async cancelar(reserva_id) {
    const result = await pool.query(
      'UPDATE bookings SET status = $1 WHERE booking_id = $2 RETURNING *',
      ['cancelado', reserva_id]
    );
    return result.rows[0];
  }
};