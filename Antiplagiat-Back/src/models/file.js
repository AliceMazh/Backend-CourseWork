import db from '../utils/dbWorker.js'
import {DataTypes} from "sequelize";

const File = db.define('File', {
    id: {
        type: DataTypes.NUMBER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    file: {
        type: DataTypes.BLOB,
        allowNull: true,
    },
    filename: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    overlap: DataTypes.NUMBER
}, {
    updatedAt: false,
    tableName: "files"
});

export default File
export {File}