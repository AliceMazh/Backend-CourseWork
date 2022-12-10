import File from '../../models/file.js'
import {generateFileToken} from "./download.js";

export async function getUserFiles(app) {
    const {userId} = app.locals.settings;
    const files = await File.findAll({
        where: {
            user_id: userId
        },
        attributes: ["id", "user_id", "filename", "overlap", "createdAt"]
    })

    const filesResult = JSON.parse(JSON.stringify(files)).map((e, i) => {
        return {...e, content: undefined, data: undefined, file: undefined, token: generateFileToken(files[i])}
    })
    return filesResult;
}

export function getFiles(app, path) {
    app.get(path, async (req, res) => {
        const filesResult = await getUserFiles(app);

        res.send({files: filesResult})
    })
}