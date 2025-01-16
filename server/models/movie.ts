import { DataTypes } from "sequelize";
import { sequelize } from '../dabatase';

export const Movie = sequelize.define('Movie', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  summary: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  poster: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  reviews: {
    type: DataTypes.ARRAY(DataTypes.UUID),
    allowNull: false,
  },
  director: {
    type: DataTypes.ARRAY(DataTypes.UUID),
    allowNull: false,
  },
  genre: {
    type: DataTypes.ARRAY(DataTypes.UUID),
    allowNull: false,
  },
  cast: {
    type: DataTypes.ARRAY(DataTypes.UUID),
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
});