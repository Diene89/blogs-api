const error = (err, _req, res, next) => {
    console.log('meu erroooooo', err);
    switch (err.name) {
      case 'loginError':
        res.status(400).json({ message: err.message });
        break;
      case 'ValidationError':
          res.status(400).json({ message: err.message });
        break;    
      case 'userError':
        res.status(409).json({ message: err.message });
        break;
      default: res.status(500).json({ message: err.message });
        break;
    }
    next();
  };
  
  module.exports = error;
