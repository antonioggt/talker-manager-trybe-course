const randomToken = () => {
  const mathRnd = Math.random().toString();
  const rndTkn = mathRnd.slice(-16);
  return rndTkn;
};

module.exports = randomToken;