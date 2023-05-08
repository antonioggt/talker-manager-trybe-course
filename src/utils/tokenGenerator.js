const crypto = require('crypto');

const randomToken = () => {
  const rndTkn = crypto.randomBytes(8).toString('hex');
  return rndTkn;
};

module.exports = randomToken;