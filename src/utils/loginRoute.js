const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const randomToken = require('./tokenGenerator');


const router = express.Router();

router.post('/', async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
      res.status(200).json({ token: `${randomToken}` });
    }
  });

module.exports = router;