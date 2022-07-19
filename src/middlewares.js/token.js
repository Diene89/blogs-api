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

const validateToken = (token) => {
  try {
    jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    const err = new Error('Expired or invalid token');
    err.name = 'InvalidToken';
    throw err;
  }
};

module.exports = {
  createToken, validateToken,
};
