const { Client } = require('pg');


async function getConnection() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'facundo',
    password: 'adm1n',
    database: 'contacts_app'
  });
  await client.connect();
  return client;
}

module.exports = getConnection;
