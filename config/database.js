const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false // Ignora a verificação do certificado (apenas para desenvolvimento)
  }
});

async function runSQLScript() {
  let client;
  try {
    client = await pool.connect();
    console.log('Conexão estabelecida com sucesso!');
    
    // Adicione seus comandos SQL aqui
    // Exemplo: await client.query('CREATE TABLE...');
    
    console.log('Script executado com sucesso!');
  } catch (error) {
    console.error('Erro ao executar o script:', error);
  } finally {
    if (client) client.release();
    await pool.end();
  }
}

runSQLScript();