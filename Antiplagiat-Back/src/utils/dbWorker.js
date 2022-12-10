import {Sequelize, Model, DataTypes} from 'sequelize';

const db = new Sequelize('mydb', 'root', 'root', {
    host: 'db',
    dialect: "mysql",
    port: 3306
});

export default db

try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
    db.close() 
}