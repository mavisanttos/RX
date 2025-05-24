require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
});

pool.connect()
  .then(() => {
    console.log('✅ Conexão com o banco de dados bem-sucedida!');
    return pool.end();
  })
  .catch((err) => {
    console.error('❌ Erro ao conectar com o banco de dados:');
    console.error(err.message);
    process.exit(1);
  });