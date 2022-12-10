import file, {File as FileModel} from "../../models/file.js";
import fs from "fs"
import crypto from "crypto"
import {sendError} from "../../utils/sendError.js";

export function generateFileToken(fileObj) {
    const needsToken = crypto.createHash("md5").update(fileObj.get("user_id") + "qweqwe").digest('hex');
    return needsToken;
}

export function downloadFilesRoute(app, path) {
    app.get(path + "/download", async (req, res) => {
        const {fileId, token} = req.query
        const fileObj = await FileModel.findOne({
            where: {
                id: fileId
            }
        })

        if (!fileObj) {
            sendError(res, 404, "Invalid file id", "Неверный id файла")
            return
        }
        const needsToken = generateFileToken(fileObj);
        if (token !== needsToken) {
            sendError(res, 401, "Invalid file token", "Неверный токен для получения файла")
            return
        }
        const blob = fileObj.get("file")
        fs.writeFileSync(fileObj.get("filename"), blob)

        res.download(fileObj.get("filename"), () => {
            fs.unlink(fileObj.get("filename"), () => {
            })
        })
    })
}