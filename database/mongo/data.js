const mongoose = require('mongoose');

const { Schema } = mongoose;

// this will be our data base's data structure
const DataSchema = new Schema(
  {
    productId: Number,
    productName: String,
    image: String,
  },
  { collection: 'junk' },
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model('Data', DataSchema);
