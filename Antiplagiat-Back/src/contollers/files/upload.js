import {sendError} from "../../utils/sendError.js";
import {PdfReader} from "pdfreader";
import File from "../../models/file.js"
import {Op} from "sequelize";
import stringSimilarity from "string-similarity";

function getRegexp(text) {
    return `(${text.replaceAll(/[^а-яА-Яa-zA-Z\s]/gmi, "").split(" ").join("|")})`;
}

export function fileUpload(app, path) {
    app.post(path + '/upload', async function (req, res) {
        const {file} = req.files
        const {userId} = app.locals.settings;
        if (file.mimetype !== "application/pdf") {
            sendError(res, 403, "File not pdf", "Это не пдф файл")
        } else {
            const text = await new Promise((resolve) => {
                let result = ""
                new PdfReader().parseBuffer(file.data, (err, item) => {
                    if (!item && !err) {
                        resolve(result)
                    } else {
                        result += item?.text
                    }
                });
            })
            const l = await File.findAll({
                where: {
                    content: {
                        [Op.regexp]: getRegexp(text),
                    }
                }
            })
            let similarity = 0
            if (l.length > 0) {
                const objSimilarity = stringSimilarity.findBestMatch(text, l.map((e) => e.get("content")));
                console.log(objSimilarity)
                if (objSimilarity?.bestMatch?.rating) {
                    similarity = Math.ceil((objSimilarity.bestMatch.rating * 100))
                }
            }
            let fileRow = await File.create({
                user_id: userId,
                content: text,
                file: file.data,
                filename: Buffer.from(file.name, 'ascii').toString(),
                overlap: similarity
            })
            fileRow = JSON.parse(JSON.stringify(fileRow))
            res.send({file: {...fileRow, content: undefined, file: undefined}})
        }
    });
}