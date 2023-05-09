const express = require('express');
// const fs = require('fs').promises;
// const path = require('path');
const talkerFsFunction = require('./utils/talkerRoute');
const loginFsFunction = require('./utils/loginRoute');
const { isTokenValid } = require('./middlewares/validations');
const { qRateforChanges, patchRate } = require('./utils/qQueryMiddle');
// const { isTokenValid, isRateFieldValid, isDateFieldValid } = require('./middlewares/validations');
// const { isRateForPatchValid } = require('./middlewares/validations');

// const talkerPath = path.resolve(__dirname, '..', 'talker.json');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

app.use('/talker', talkerFsFunction);
app.use('/login', loginFsFunction);
app.patch('/talker/rate/:id', 
isTokenValid,
qRateforChanges, 
async (req, res) => {
  try {
    const { id } = req.params;
    console.log('iodfsbn');
    const { rate } = req.body;
    const updatedRate = await patchRate(Number(id), rate);
    if (updatedRate) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});
app.listen(PORT, () => {
  console.log('Online');
});
