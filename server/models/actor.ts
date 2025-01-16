import { DataTypes } from "sequelize";
import { sequelize } from '../dabatase';

export const Actor = sequelize.define('Actor', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});