import express from "express"
import usersRoute from "./contollers/users/index.js"
import {tokenMiddleware} from "./utils/security.js";
import fileUpload from "express-fileupload"
import filesRoute from "./contollers/files/index.js";
import cors from "cors"

const app = express()
const port = 5000
app.use(cors())

app.use(fileUpload({
    limits: {fileSize: 50 * 1024 * 1024},
}));

tokenMiddleware(app)
usersRoute(app)
filesRoute(app)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

