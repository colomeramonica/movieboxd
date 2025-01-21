import { DataTypes, Model, UUIDV4 } from 'sequelize';
import sequelize from './index';

interface UserAttributes {
  id: string;
  username: string;
  email: string;
  password: string;
  name: string;
  avatar?: string;
  bio?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User extends Model<UserAttributes> implements UserAttributes {
  public id!: string;
  public username!: string;
  public email!: string;
  public password!: string;
  public name!: string;
  public avatar?: string;
  public bio?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
}

User.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'User',
  timestamps: true
});

export default { User };
