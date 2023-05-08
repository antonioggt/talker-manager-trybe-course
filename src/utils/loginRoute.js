const express = require('express');
const crypto = require('crypto');

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  const randomToken = crypto.randomBytes(8).toString('hex');
  if (email && password) {
    res.status(200).json({ token: `${randomToken}` });
  }
});

module.exports = router;