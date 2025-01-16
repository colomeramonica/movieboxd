import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize ({
    username: 'root',
    password: '123456',
    database: 'db_teste',
    host: 'localhost',
    dialect: 'mysql'
});