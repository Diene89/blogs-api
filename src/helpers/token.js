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

module.exports = createToken;