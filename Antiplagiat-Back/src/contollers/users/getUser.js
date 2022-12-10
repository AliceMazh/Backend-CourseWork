import User from "../../models/user.js";
import {getUserFiles} from "../files/get.js";

export default function getUser(app, path) {
    app.get(`${path}`, async (req, res) => {
        const {userId} = app.locals.settings;
        const user = await User.findOne({
            where: {id: userId}
        })

        const files = await getUserFiles(app)

        res.send({
            result: {...JSON.parse(JSON.stringify(user)), password: undefined, files},
        })
    })
}