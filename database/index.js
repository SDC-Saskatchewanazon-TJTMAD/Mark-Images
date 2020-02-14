// const mysql = require('mysql');
// const mysqlConfig = require('./config.js');

// const connection = mysql.createConnection(mysqlConfig);

const { MongoClient } = require('mongodb');

const connection = 'mongodb://localhost:27017/';

const getImage = (prodId, callback) => {
  MongoClient.connect('connection', (err, db) => {
    if (err) throw err;
    const dbo = db.db('test');
    const query = { productId: prodId };
    dbo.collection('testProductData').find(query).toArray((err, result) => {
      if (err) {
        throw err;
      } else {
        callback(null, result);
        console.log(result);
        db.close();
      }
    });
  });
};

//response to /getImages pulls url and product name
// const getImage = (prodId, callback) => {
//   connection.query(`SELECT imgUrl, productName FROM ImageUrls WHERE ProductId = '${prodId}';`, (err, data) => {
//     if (err) {
//       throw err;
//     } else {
//       callback(null, data);
//     }
//   });
// };

module.exports = {
  getImage,
};
