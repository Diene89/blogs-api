const userService = require('../services/userService');

const createUser = async (req, res) => {
    const { displayName, email, password, image } = req.body;

    const result = await userService.createUser(displayName, email, password, image);
    return res.status(201).json(result);
};

const listUsers = async (req, res) => {
    const result = await userService.listUsers();
    
    return res.status(200).json(result);
};
    
module.exports = {
    createUser, listUsers,
};
