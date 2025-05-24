const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres.tagbpgclmfljlperriqc',
  host: 'aws-0-us-east-2.pooler.supabase.com',
  database: 'postgres',
  password: 'LtF00iEx89O9goJO', // substitua pela senha real
  port: 3000,
  ssl: {
    rejectUnauthorized: false // necessário para Supabase
  }
});

// Adicione tratamento de erros
pool.on('error', (err) => {
  console.error('Erro inesperado no cliente inativo', err);
});

async function getConnection() {
  let client;
  try {
    client = await pool.connect();
    return client;
  } catch (err) {
    console.error('Erro ao conectar:', err);
    throw err;
  }
}

async function queryDatabase() {
  const client = await getConnection();
  try {
    const res = await client.query('SELECT NOW()');
    return res.rows;
  } finally {
    client.release(); // IMPORTANTE: libera a conexão
  }
}