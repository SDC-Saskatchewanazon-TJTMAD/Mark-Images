/* mongoSeeder.js */
// Run by typing command: node server/mongoSeeder.js FROM project folder

const faker = require('faker');
const { MongoClient } = require('mongodb');
const assert = require('assert');
const _ = require('lodash');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database & Collection Name
const dbName = 'test'; //*** Change to Database name
const collectionName = 'junk'; //*** Change to Collection name
const quantity = 1000; //*** Total number of data instances to add to db
const dataBlockSize = 100; //*** Size of each Array that is pushed to db

let db;
let counter = 1;

// Create data instances
const seed = (collect) => {
  let products = [];
  for (let i = counter; i < counter + dataBlockSize; i++) {
    const productName = faker.commerce.productName();
    const newProduct = {
      productId: i,
      productName,
      image: 'https://picsum.photos/640/480',
    };
    products.push(newProduct);
    // console.log(newProduct.productId, newProduct.productName, newProduct.image);
  }
  db.collection(collect).insertMany(products)
    .then(products = [])
    .then(console.log(`Partial seed completed ${Math.ceil(counter / dataBlockSize)} of ${Math.floor(quantity / dataBlockSize)}`))
    .then(() => {
      if (counter + dataBlockSize <= quantity) {
        counter += dataBlockSize;
        seed(collect);
      } else {
        console.log('Database seeded!');
      }
    });
};

// Delete database and run seed
const mongoSeeder = (collection, overwrite) => {
  MongoClient.connect(url, (err, client) => {
    //assert.equal(null, err);
    db = client.db(dbName);
    if (overwrite) {
      db.collection(collection).drop((error, del) => {
        if (error) throw error;
        if (del) console.log('Collection deleted');
        seed(collection);
      });
    } else {
      seed(collection);
    }
    //client.close();
  });
};

mongoSeeder(collectionName, true);
