const userService = require('../services/userService');

const userController = async (req, res) => {
    const { displayName, email, password, image } = req.body;

    const result = await userService(displayName, email, password, image);
    console.log('ooooooooooooo', result);
    return res.status(201).json(result);
};
    
module.exports = userController;
