const randomToken = () => {
  const mathRnd = Math.random();
  const stringfy = mathRnd.toString();
  const rndTkn = stringfy.slice(-16);
  return rndTkn;
};

module.exports = randomToken;