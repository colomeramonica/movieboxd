import { Sequelize } from 'sequelize';
import config from './config/config';

const env = process.env.NODE_ENV || 'development';
const { username = '', password = '', database = '', host, dialect } = config[env];

export const sequelize = new Sequelize(database, username, password, {
  host,
  dialect
});
