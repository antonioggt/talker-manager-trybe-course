const express = require('express');
const crypto = require('crypto');
const validations = require('../middlewares/validations');

const router = express.Router();

const { isLoginValid, isEmailValid, isPasswordValid } = validations;

router.post('/', isLoginValid, isEmailValid, isPasswordValid, async (req, res) => {
  const { email, password } = req.body;
  const token = crypto.randomBytes(8).toString('hex');
  if (email && password) {
    res.status(200).json({ token });
  }
});

module.exports = router;