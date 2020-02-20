const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'password',
  port: 9000,
});
client.connect();

// client.query('SELECT NOW()', (err, res) => {
//   console.log(err, res);
//   client.end();
// });

const getImage = (prodId, callback) => {
  console.log('Postgres Activated');
  console.log(prodId);
  client.query(`SELECT * FROM junk WHERE productid = '${prodId}';`, (err, data) => {
    console.log(data.rows[0]);
    if (err) {
      throw err;
    } else {
      callback(null, data.rows[0]);
    }
    //client.end();
  });
};

module.exports = {
  getImage,
};
