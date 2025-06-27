const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();


router.get('/', (req, res) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    res.status(401).json('No token provided');
  }

  const SECRET_KEY = 'msngrclone';

  jwt.verify(token, SECRET_KEY, (err, data) => {
    if (err) {
      res.status(500).json('Failed to authenticate token');
    }

    console.log(data);

    const products = [{ name: 'Car' }, { name: 'Phone' }];
    res.json(products);
  });
});

module.exports = router;
