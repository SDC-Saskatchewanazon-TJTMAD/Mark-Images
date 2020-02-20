const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/../client/dist`));

//Response to componentDidMount pulls image info from db based on product id

//MONGO
// const dbRoute = 'mongodb://localhost:27017/';
// mongoose.connect(dbRoute, { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;
// const Data = require('../database/mongo/data.js');

// db.once('open', () => console.log('connected to the database'));
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// app.get('/getImages', (req, res) => {
//   console.log('Getting Image');
//   Data.find({ _id: req.query.productId }, (err, data) => {
//     if (err) return res.json({ success: false, error: err });
//     return res.json({ success: true, data: data });
//   });
// });

//POSTGRES
const datab = require('../database/postgres/index.js');

app.get('/getImages', (req, res) => {
  datab.getImage(req.query.productId, (err, data) => {
    if (err) {
      console.error('server get error');
    } else {
      res.send(data);
    }
  });
});


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
