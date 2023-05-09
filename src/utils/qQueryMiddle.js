const path = require('path');
const fs = require('fs').promises;

const talkerPath = path.resolve(__dirname, '..', 'talker.json');

const treatName = async () => {
  try {
    const resp = await fs.readFile(talkerPath, 'utf-8');
    return JSON.parse(resp);
    } catch (error) {
    return null;
    }
};

const treatRate = async (rate, filtered) => {
  const filter = filtered.filter((e) => e.talk.rate === rate);
  return filter;
};

const treatWatched = async (date, filtered) => {
    const filter = filtered.filter((e) => e.talk.watchedAt === date);
    return filter;
  };

const patchRate = async (id, rate) => {
  const users = await treatName();
  const findUser = users.find((e) => e.id === id);
  if (findUser) {
      findUser.talk.rate = rate;
    await fs.writeFile(talkerPath, JSON.stringify(users));
  }
  return findUser;
};
  
const qName = async (req, res, next) => {
    const { q } = req.query;
    const parsedResp = await treatName();
    console.log('********* teste *************', parsedResp);
    if (!q) {
      req.xxx = parsedResp;
      // console.log('********************* teste *******************', req.xxx);
    } 
    if (q) {
      const filter = parsedResp.filter((e) => e.name.includes(q));
      console.log('teste filter **', filter);
      req.xxx = filter;
    }
    next();
  };

  const qRate = async (req, res, next) => {
    const { rate } = req.query;
  
    const numberRate = Number(rate);
    console.log('numberRate', numberRate);
    if (rate !== undefined) {
      if (!Number.isInteger(numberRate) || (numberRate < 1 || numberRate > 5)) {    
      return res.status(400)
      .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
    }
    const filter = await treatRate(numberRate, req.xxx);
    req.xxx = filter;
  }
  next();
};

const qWatchedAt = async (req, res, next) => {
    const { date } = req.query;
    if (date !== undefined && date !== '') {
      const dateValidator = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
      const validatedDate = dateValidator.test(date);
       if (!validatedDate) {
        return res.status(400)
                  .json({ message: 'O parâmetro "date" deve ter o formato "dd/mm/aaaa"' });
      }
      const filteredTalkers = await treatWatched(date, req.xxx);
      req.xxx = filteredTalkers;
    }
    next();
  };

const qRateforChanges = (req, res, next) => {
  const { rate } = req.body;
  if (rate === undefined) return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  if (!Number.isInteger(rate) || (rate < 1 || rate > 5)) {    
  return res.status(400)
  .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }
  next();
};

module.exports = {
    qName,
    qRate,
    qWatchedAt,
    qRateforChanges,
    patchRate,
};
