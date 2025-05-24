const { Client } = require('pg');

async function testConnection() {
  const client = new Client({
    user: 'postgres.tagbpgclmfljlperriqc',
    host: 'aws-0-us-east-2.pooler.supabase.com',
    database: 'postgres',
    password: 'LtF00iEx89O9goJO',
    port: 5432,
    ssl: { 
      rejectUnauthorized: false 
    },
    // Adicione esta linha para forçar MD5:
    connectionTimeoutMillis: 5000,
    options: '-c authentication=md5'
  });

  try {
    await client.connect();
    console.log('✅ Conexão bem-sucedida!');
    const res = await client.query('SELECT NOW()');
    console.log('Data/hora do servidor:', res.rows[0].now);
  } catch (err) {
    console.error('❌ Erro na conexão:', err);
  } finally {
    await client.end();
  }
}

testConnection();