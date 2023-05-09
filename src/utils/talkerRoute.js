const express = require('express');
const path = require('path');
const fs = require('fs').promises;

const router = express.Router();

const { isAgeValid, isNameValid, isTalkValid } = require('../middlewares/validations');
const { isTokenValid, isDateValid, isRateValid } = require('../middlewares/validations');

const val1 = isTokenValid;
const val2 = isNameValid;
const val3 = isTalkValid;
const val4 = isAgeValid;
const val5 = isDateValid;
const val6 = isRateValid;

const talkerPath = path.resolve(__dirname, '..', 'talker.json');

router.get('/search', val1, async (req, res) => {
  const resp = await fs.readFile(talkerPath, 'utf-8');
  const parsedResp = JSON.parse(resp);
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(200).json(parsedResp);
    }
    const filter = parsedResp.filter((e) => e.name.includes(q));
    res.status(200).json(filter);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

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

  router.post('/', val1, val2, val3, val4, val5, val6, async (req, res) => {
    const resp = await fs.readFile(talkerPath, 'utf-8');
    const parsedResp = JSON.parse(resp);
    const user = { ...req.body };
    const autoIncrement = parsedResp[parsedResp.length - 1].id + 1;
    const newUser = { id: autoIncrement, ...user };

    parsedResp.push(newUser);
    await fs.writeFile(talkerPath, JSON.stringify(parsedResp));

    return res.status(201).json(newUser);
  });

  router.put('/:id', val1, val2, val3, val4, val5, val6, async (req, res) => {
    const { ...updatingPerson } = req.body; 
    const { id } = req.params;
    const resp = await fs.readFile(talkerPath, 'utf-8');
    const parsedResp = JSON.parse(resp);
    const findUser = parsedResp.find((e) => e.id === +id);
    const message = 'Pessoa palestrante não encontrada';
    if (!findUser) {
      return res.status(404).json({ message });
    }
    const putUser = {
      id: +id,
      ...updatingPerson,
    };
    const filter = parsedResp.filter((e) => e.id !== +id);
    await fs.writeFile(talkerPath, JSON.stringify([...filter, putUser]), 'utf-8');
    return res.status(200).json(putUser);
  });

  router.delete('/:id', isTokenValid, async (req, res) => {
    const resp = await fs.readFile(talkerPath, 'utf-8');
    const parsedResp = JSON.parse(resp);
    const { id } = req.params;

    const deleteUser = parsedResp.filter((e) => e.id !== +id);

    await fs.writeFile(talkerPath, JSON.stringify(deleteUser), 'utf-8');
    
    return res.status(204).json();
  });

module.exports = router;