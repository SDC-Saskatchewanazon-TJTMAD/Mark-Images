const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/../client/dist'));

app.get('/getImages', (req, res) => {
  // console.log(req.query.productId);
  db.getImage(req.query.productId, (err, data) => {
    if (err) {
      console.error('server get error');
    } else {
      // console.log(data)
      res.send(data);
    }
  })
});

app.post('/images', (req, res) => {
  db.addTo(req.body.productId, req.body.imgUrls, req.body.productName,  (err, data) => {
    if (err) console.error('server post error');
    res.send(data);
  })
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
