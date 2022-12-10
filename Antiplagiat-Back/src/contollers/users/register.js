import User from "../../models/user.js";
import {generateToken} from "../../utils/tokenManager.js";
import {sendError} from "../../utils/sendError.js";

export default function registerRoute(app, path) {
    app.post(`${path}/register`, async (req, res) => {
        const {login, password} = req.query
        const existingUser = await User.findOne({where: {login}})
        if (existingUser) {
            sendError(res, 500, "User with some login already exists",
                "Пользователь с таким логином уже существует")
            return
        }
        const user = await User.create({login, password})

        res.send({token: generateToken(user.get("id"), "user")})
    })
}