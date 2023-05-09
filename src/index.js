const express = require('express');
// const fs = require('fs').promises;
// const path = require('path');
const talkerFsFunction = require('./utils/talkerRoute');
const loginFsFunction = require('./utils/loginRoute');
// const { isTokenValid, isRateFieldValid, isDateFieldValid } = require('./middlewares/validations');
// const { isRateForPatchValid } = require('./middlewares/validations');

// const talkerPath = path.resolve(__dirname, '..', 'talker.json');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

app.use('/talker', talkerFsFunction);
app.use('/login', loginFsFunction);
/* app.get('/talker/search', val1, val7, val8, async (req, res) => {
  const val1 = isTokenValid;
  const val7 = isRateFieldValid;
  const val8 = isDateFieldValid;
  const resp = await fs.readFile(talkerPath, 'utf-8');
  const parsedResp = await JSON.parse(resp);
  let dinamicResp = await parsedResp;

  const { q, rate, date } = req.query;

  if (q) {
    dinamicResp = dinamicResp.filter((e) => e.name.includes(q));
  }
  if (rate) {
    dinamicResp = dinamicResp.filter((e) => e.talk.rate === +rate);
  }
  if (date) {
    dinamicResp = dinamicResp.filter((e) => e.talk.watchedAt === date);
  }

  console.log(dinamicResp);
  return res.status(200).json(dinamicResp);
});
*/
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
