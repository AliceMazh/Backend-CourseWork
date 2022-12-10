import User from "../../models/user.js";
import {generateToken} from "../../utils/tokenManager.js";
import {sendError} from "../../utils/sendError.js";

export default function authRoute(app, path) {
    app.get(`${path}/auth`, async (req, res) => {
        const {login, password} = req.query
        const user = await User.findOne({
            where: {
                login, password
            }
        })
        if (!user) {
            sendError(res, 404, "Пользователь не найден", "User not found")
            return;
        }

        res.send({token: generateToken(user.get("id"), "user")})
    })
}