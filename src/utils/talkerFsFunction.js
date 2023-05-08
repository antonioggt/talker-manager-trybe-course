const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const randomToken = require('./tokenGenerator');

const router = express.Router();

const talkerPath = path.resolve(__dirname, '..', 'talker.json');

router.get('/', async (_req, res) => {
    try {
      const resp = await fs.readFile(talkerPath, 'utf-8');
      const parsedResp = JSON.parse(resp);
      return res.status(200).json(parsedResp);
    } catch (error) {
      console.error(error);
      return res.status(200).json([]);
    }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const resp = await fs.readFile(talkerPath, 'utf-8');
  const parsedResp = JSON.parse(resp);

  try {
    const findId = parsedResp.find((e) => e.id === +id);
    if (findId) {
      return res.status(200).json(findId);
    }
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  } catch (error) {
    console.error(error);
  }
});

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    res.status(200).json({ token: `${randomToken}` });
  }
});

module.exports = router;