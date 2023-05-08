const crypto = require('crypto');

const rndTkn = crypto.randomBytes(8).toString('hex');

/* const randomToken = () => {
  const rndTkn = crypto.randomBytes(8).toString('hex');
  return rndTkn;
}; */

module.exports = rndTkn;