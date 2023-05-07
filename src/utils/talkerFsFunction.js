const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const router = express.Router();

const talkerPath = path.resolve(__dirname, './talker.json');

router.get('/', async (_req, res) => {
    try {
      const resp = await fs.readFile(talkerPath, 'utf-8');
      const parsedResp = JSON.parse(resp)
      return res.status(200).json(parsedResp)
    } catch (error) {
      console.error(error);
      return res.status(200).json([]);
    }
})

module.exports = router;

