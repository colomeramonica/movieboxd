import { Dialect, Sequelize } from 'sequelize';

const config = {
  username: "root",
  password: "",
  database: "movieboxd_dev",
  host: "127.0.0.1",
  dialect: "sqlite"
};

const { username, password, database, host, dialect } = config;

export const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: dialect as Dialect
});

export default sequelize;