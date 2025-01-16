import { DataTypes } from "sequelize";
import { sequelize } from '../dabatase';

export const Genre = sequelize.define('Genre', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});