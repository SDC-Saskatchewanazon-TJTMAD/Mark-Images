const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);

//response to /getImages pulls url and product name
const getImage = (prodId, callback) => {
  connection.query(`select imgUrl, productName from ImageUrls where ProductId = '${prodId}';`, (err, data) => {
    if (err) {
      throw err;
    } else {
      callback(null, data);
    }
  });
};

module.exports = {
  getImage,
};
