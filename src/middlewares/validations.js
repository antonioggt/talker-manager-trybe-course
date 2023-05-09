const isLoginValid = (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }

  next();
};

const isEmailValid = (req, res, next) => {
  const { email } = req.body;
  const emailValidator = /\S+@\S+\.\S+/.test(email);
  
  if (!emailValidator) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  
  next();
};

const isPasswordValid = (req, res, next) => {
  const { password } = req.body;
  const passwordValidator = password.length > 6;
    
  if (!passwordValidator) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
    
  next();
};

const isTokenValid = (req, res, next) => {
  const token = req.headers.authorization;

  if (token === undefined) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  if (typeof token !== 'string' || token.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
    
  next();
};

const isNameValid = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const isAgeValid = (req, res, next) => {
  const { age } = req.body;
  const message = 'O campo "age" deve ser um número inteiro igual ou maior que 18';

  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if ((!(Number.isInteger(age))) || age < 18) {
    return res.status(400).json({ message });
  }

  next();
};

const isTalkValid = (req, res, next) => {
  const { talk } = req.body;

  if (!talk) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }
  
  next();
};

const isDateValid = (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt } = talk;

  if (!watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }

  const dateValidator = /(\d{2})(\/)(\d{2})(\/)(\d{4})$/.test(watchedAt);

  if (!dateValidator) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  
  next();
};

const isRateValid = (req, res, next) => {
  const { talk } = req.body;
  const { rate } = talk;
  const message = 'O campo "rate" deve ser um número inteiro entre 1 e 5';

  if (rate === undefined) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  if (!Number.isInteger(rate) || rate < 1 || rate > 5) { 
    return res.status(400).json({ message });
  }

  next();
};

const isRateFieldValid = (req, res, next) => {
  const { rate } = req.query;
  const message = 'O campo "rate" deve ser um número inteiro entre 1 e 5';

  if (rate === undefined) {
    return res.status(400).json({ message });
  }
  if (!Number.isInteger(+rate) || rate < 1 || rate > 5) { 
    return res.status(400).json({ message });
  }

  next();
};

const isDateFieldValid = (req, res, next) => {
  const { date } = req.query;
  const message = 'O parâmetro "date" deve ter o formato "dd/mm/aaaa"';

  const dateValidator = /(\d{2})(\/)(\d{2})(\/)(\d{4})$/.test(date);

  if (date && !dateValidator) {
    return res.status(400).json({ message });
  }
  
  next();
};

const isRateForPatchValid = async (req, res, next) => {
  const { rate } = req.query;
  const intRate = +rate;
  if (rate && (intRate < 1 || intRate > 5 || !Number.isInteger(intRate))) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
    });
  }
  next();
};

module.exports = {
    isLoginValid,
    isEmailValid,
    isPasswordValid,
    isTokenValid,
    isNameValid,
    isAgeValid,
    isTalkValid,
    isDateValid,
    isRateValid,
    isRateFieldValid,
    isDateFieldValid,
    isRateForPatchValid,
};