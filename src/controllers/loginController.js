const loginService = require('../services/loginService');

const loginController = async (req, res) => {
    const { email, password } = req.body;

    const result = await loginService(email, password);
    console.log(result);
    return res.status(200).json(result);
};
    
module.exports = loginController;
