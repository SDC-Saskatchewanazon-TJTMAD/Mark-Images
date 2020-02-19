const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;
const dbRoute = 'mongodb://localhost:27017/';
const Data = require('../../database/mongo/data.js');

mongoose.connect(dbRoute, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/../../client/dist`));

db.once('open', () => console.log('connected to the database'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//response to componentDidMount pulls image info from db based on product id
app.get('/getImages', (req, res) => {
  console.log('Getting Image');
  Data.find({ productId: req.query.productId }, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
