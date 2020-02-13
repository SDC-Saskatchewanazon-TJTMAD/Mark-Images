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

const mongoSeeder = (quantity, collectionName, overwrite) => {
  // Use connect method to connect to the server
  MongoClient.connect(url, (err, client) => {
    assert.equal(null, err);

    const db = client.db(dbName);

    if (overwrite) {
      db.collection(collectionName).drop((err, del) => {
        // Error Handling
        if (err) throw err;
        if (del) console.log('Collection deleted');

        // Create data instances
        const products = [];
        for (let i = 1; i <= quantity; i++) {
          const productName = faker.commerce.productName();
          const newProduct = {
            productId: i,
            productName,
            image: 'https://picsum.photos/640/480',
          };
          products.push(newProduct);
          console.log(newProduct.productId, newProduct.productName, newProduct.image);
        }
        db.collection(collectionName).insertMany(products);
        console.log('Database seeded!');
        client.close();
      });
    }
  });
};
mongoSeeder(10, 'test2', true);
