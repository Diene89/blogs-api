const error = (err, _req, res, next) => {
    switch (err.name) {
      case 'ValidationError':
          res.status(400).json({ message: err.message });
        break;    
      case 'userError':
        res.status(409).json({ message: err.message });
        break;
      case 'InvalidToken':
        res.status(401).json({ message: err.message });
        break;
      case 'userNotExistError':
        res.status(404).json({ message: err.message });
        break;
      default: res.status(500).json({ message: err.message });
        break;
    }
    next();
  };
  
  module.exports = error;
