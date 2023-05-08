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

module.exports = {
    isLoginValid,
    isEmailValid,
    isPasswordValid,
};