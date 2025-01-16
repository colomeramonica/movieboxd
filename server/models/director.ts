import { DataTypes } from "sequelize";
import { sequelize } from '../dabatase';

export const Director = sequelize.define('Director', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});