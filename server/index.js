const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
//const logger = require('morgan');
//const database = require('../database');

const app = express();
const PORT = 3000;
//const router = express.Router();
const dbRoute = 'mongodb://localhost:27017/';
const Data = require('.././database/data.js');

mongoose.connect(dbRoute, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

app.use(cors());
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/../client/dist`));

db.once('open', () => console.log('connected to the database'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//response to componentDidMount pulls image info from db based on product id
app.get('/getImages', (req, res) => {
  console.log('Hello');
  Data.find(/*req.query.productId,*/ (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

//app.use('/api', router);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
