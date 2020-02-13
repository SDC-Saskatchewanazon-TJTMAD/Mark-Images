/* mongoSeeder.js */
// run by typing command: node server/mongoSeeder.js FROM project folder

const faker = require('faker');
const { MongoClient } = require('mongodb');
const assert = require('assert');
const _ = require('lodash');
// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'test'; //*** Change to db name ***

// Use connect method to connect to the server
MongoClient.connect(url, (err, client) => {
  assert.equal(null, err);

  const db = client.db(dbName);

  // get access to the relevant collections
  const usersCollection = db.collection('users2'); //*** Name of collection - Doesn't need to exist ***
  //const postsCollection = db.collection('posts');

  // create data instances
  const users = [];
  for (let i = 0; i < 100; i += 1) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const newUser = {
      email: faker.internet.email(firstName, lastName),
      firstName,
      lastName,
      password: 'password123',
    };
    users.push(newUser);

    // console.log data instances
    console.log(newUser.email, newUser.firstName, newUser.lastName);
  }
  usersCollection.insertMany(users);

  // make a bunch of posts
  // const posts = [];
  // for (let i = 0; i < 5000; i += 1) {
  //   const newPost = {
  //     title: faker.lorem.words(7),
  //     body: faker.lorem.words(500),

  //     // use lodash to pick a random user as the author of this post
  //     author: _.sample(users),

  //     // use lodash to add a random subset of the users to this post
  //     likes: _.sampleSize(users, Math.round(Math.random * users.length)).map(
  //       user => user._id,
  //     ),
  //   };
  //   posts.push(newPost);

  //   // console.log data instances
  //   console.log(newPost.title);
  // }
  // postsCollection.insertMany(posts);

  //Confirmation
  console.log('Database seeded!');
  client.close();
});
