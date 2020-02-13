/* mongoSeeder.js */
// un by typing command: node server/mongoSeeder.js FROM project folder

const faker = require('faker');
const { MongoClient } = require('mongodb');
const assert = require('assert');
const _ = require('lodash');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'test'; //*** Change to db name ***
const collectionName = 'testProductData';
const dataBlockSize = 1000; //*** Size of each Array that is pushed to db ***/

const mongoSeeder = (quantity, collection, overwrite) => {
  // Use connect method to connect to the server
  MongoClient.connect(url, (err, client) => {
    assert.equal(null, err);

    const db = client.db(dbName);

    if (overwrite) {
      db.collection(collection).drop((err, del) => {
        // Error Handling
        if (err) throw err;
        if (del) console.log('Collection deleted');

        // Create data instances
        let products = [];
        let counter = 1;
        for (let i = 1; i <= quantity; i++) {
          const productName = faker.commerce.productName();
          const newProduct = {
            productId: i,
            productName,
            image: 'https://picsum.photos/640/480',
          };
          products.push(newProduct);
          console.log(newProduct.productId, newProduct.productName, newProduct.image);
          if (products.length === dataBlockSize || i === quantity) {
            db.collection(collection).insertMany(products)
              .then(products = [])
              .then(console.log(`Partial seed completed ${counter} of ${Math.floor(quantity / dataBlockSize)}`))
              .then(counter++);
          }
        }
        console.log('Database seeded!');
        client.close();
      });
    }
  });
};
mongoSeeder(10000, collectionName, true);
