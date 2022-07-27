const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const createToken = (param) => {
    const jwtConfig = {
        expiresIn: '7d',
        algorithm: 'HS256',
      };
    
      const token = jwt.sign({ data: param }, secret, jwtConfig);
    
      return token;
};

const validateToken = (req, _res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    const err = new Error('Token not found');
    err.name = 'InvalidToken';
    throw err;
  }
  try {
    const ret = jwt.verify(token, process.env.JWT_SECRET);
    console.log('meu token é', ret);
  } catch (error) {
    const err = new Error('Expired or invalid token');
    err.name = 'InvalidToken';
    throw err;
  }

  next();
};

module.exports = {
  createToken, validateToken,
};
