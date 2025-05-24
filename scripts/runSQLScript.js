const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: true,
    ca: require('fs').readFileSync(require.resolve('pg/lib/ssl/root.crt')).toString()
  } : {
    rejectUnauthorized: false // Apenas para desenvolvimento
  }
});

async function runSQLScript() {
  let client;
  try {
    client = await pool.connect();
    console.log('✅ Conexão com o Supabase estabelecida com sucesso!');

    // Verifica se as tabelas já existem
    const tableCheck = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'users'
      );
    `);
    
    if (tableCheck.rows[0].exists) {
      console.log('⏩ Tabelas já existem no banco de dados');
      return;
    }

    console.log('⏳ Criando estrutura do banco de dados...');
    
    // Inicia transação
    await client.query('BEGIN');
    
    try {
      await client.query(`
        -- Tabela de usuários
        CREATE TABLE users (
          user_id SERIAL PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          email VARCHAR(100) UNIQUE NOT NULL,
          class VARCHAR(3),
          group_number INT,
          google_id VARCHAR(100) UNIQUE,
          created_at TIMESTAMP DEFAULT NOW()
        );

        -- Tabela de salas
        CREATE TABLE rooms (
          room_id SERIAL PRIMARY KEY,
          room_number VARCHAR(20) UNIQUE NOT NULL,
          location VARCHAR(100) NOT NULL,
          capacity INT,
          features TEXT[]
        );

        -- Tabela de horários predefinidos
        CREATE TABLE predefined_times (
          time_slot_id SERIAL PRIMARY KEY,
          start_time TIME NOT NULL,
          end_time TIME NOT NULL,
          CONSTRAINT valid_time_slot CHECK (end_time > start_time),
          CONSTRAINT unique_time_slot UNIQUE (start_time, end_time)
        );

        -- Tabela de reservas
        CREATE TABLE bookings (
          booking_id SERIAL PRIMARY KEY,
          user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
          room_id INT NOT NULL REFERENCES rooms(room_id) ON DELETE CASCADE,
          date DATE NOT NULL,
          time_slot_id INT NOT NULL REFERENCES predefined_times(time_slot_id),
          status VARCHAR(30) DEFAULT 'reservado',
          created_at TIMESTAMP DEFAULT NOW(),
          
          CONSTRAINT unique_booking UNIQUE (room_id, date, time_slot_id),
          CONSTRAINT one_booking_per_user_per_slot UNIQUE (user_id, date, time_slot_id),
          CONSTRAINT valid_status CHECK (status IN ('reservado', 'cancelado', 'concluído'))
        );

        -- Popula os horários disponíveis
        INSERT INTO predefined_times (start_time, end_time)
        SELECT 
          make_time(hour, 0, 0)::TIME, 
          make_time(hour + 1, 0, 0)::TIME
        FROM generate_series(7, 20) AS hour;
      `);

      await client.query('COMMIT');
      console.log('✅ Banco de dados inicializado com sucesso!');
    } catch (queryError) {
      await client.query('ROLLBACK');
      console.error('❌ Erro durante a execução das queries:', queryError.message);
      throw queryError; // Re-lança o erro para ser capturado no catch externo
    }

  } catch (connectionError) {
    console.error('❌ Erro de conexão:', connectionError.message);
    
    // Dicas específicas para erros comuns
    if (connectionError.code === 'SELF_SIGNED_CERT_IN_CHAIN') {
      console.log('🔒 Dica SSL: Verifique a configuração de certificados ou use rejectUnauthorized: false em desenvolvimento');
    } else if (connectionError.code === 'ECONNREFUSED') {
      console.log('🌐 Dica de Conexão: Verifique host, porta e se o servidor está online');
    }
    
  } finally {
    if (client) {
      client.release();
    }
    await pool.end();
  }
}

runSQLScript();