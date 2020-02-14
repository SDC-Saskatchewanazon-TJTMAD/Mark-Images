const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('../database');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/../client/dist`));

//response to componentDidMount pulls image info from db based on product id
app.get('/getImages', (req, res) => {
  console.log('Hello');
  db.getImage(req.query.productId, (err, data) => {
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
