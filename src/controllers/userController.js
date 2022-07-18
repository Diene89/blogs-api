const userService = require("../services/userService")

const userController = async (req, res) => {
    const { email, password } = req.body;
    console.log("entrou", email, password);

    const result = await userService.loginService(email, password);
    console.log(result);
    return res.status(200).json(result)
}
    
module.exports = userController;
