import { Dialect } from 'sequelize';

interface Config {
  username: string;
  password: string | null;
  database: string;
  host: string;
  dialect: Dialect;
}

const config: { [key: string]: Config } = {
  development: {
    username: "root",
    password: null,
    database: "movieboxd_dev",
    host: "127.0.0.1",
    dialect: "sqlite"
  },
  test: {
    username: "root",
    password: null,
    database: "movieboxd_test",
    host: "127.0.0.1",
    dialect: "sqlite"
  },
  production: {
    username: "root",
    password: null,
    database: "movieboxd_prd",
    host: "127.0.0.1",
    dialect: "sqlite"
  }
};

export default config;
