import { DataTypes, Model } from 'sequelize';
import sequelize from './index';

export class Movie extends Model<MovieAttributes> implements MovieAttributes {
  public id!: number;
  public tmdbId!: number;
  public title!: string;
  public posterPath?: string;
}

interface MovieAttributes {
  id: number;
  tmdbId: number;
  title: string;
  posterPath?: string;
}

Movie.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: false
  },
  tmdbId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  posterPath: DataTypes.STRING
}, {
  sequelize,
  modelName: 'Movie',
  timestamps: false
});