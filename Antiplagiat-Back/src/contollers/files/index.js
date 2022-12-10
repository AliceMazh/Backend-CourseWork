import {fileUpload} from "./upload.js";
import {getFiles} from "./get.js";
import {downloadFilesRoute} from "./download.js";
import {deleteFileRoute} from "./delete.js";

export default function filesRoute(app) {
    const path = "/files"

    fileUpload(app, path)
    getFiles(app, path)
    downloadFilesRoute(app, path)
    deleteFileRoute(app, path)
}