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
  
module.exports = {
    qName,
    qRate,
};
