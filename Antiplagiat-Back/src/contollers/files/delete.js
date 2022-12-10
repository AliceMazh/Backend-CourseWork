import File from "../../models/file.js"

export function deleteFileRoute(app, path) {
    app.delete(path, async (req, res) => {
        const {fileId} = req.query
        const result = await File.destroy({
            where: {
                id: fileId
            }
        })
        if (result) {
            res.send({result: "ok"})
        } else {
            res.status(405).send({result: "error"})
        }
    })
}