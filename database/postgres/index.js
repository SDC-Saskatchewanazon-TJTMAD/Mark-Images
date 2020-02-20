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
  client.query(`SELECT * FROM junk WHERE productid = 3` /*"${prodId}";`*/, (err, data) => {
    console.log(data.rows);
    if (err) {
      throw err;
    } else {
      callback(null, data);
    }
    //client.end();
  });
};

module.exports = {
  getImage,
};
