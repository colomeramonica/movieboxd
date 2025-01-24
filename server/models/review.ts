import { DataTypes, Model, UUIDV4 } from 'sequelize';
import sequelize from './index';
import { User } from "./user";

interface ReviewAttributes {
  id: string;
  userId: string;
  movieId: string;
  reviewText: string;
  rating: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Review extends Model<ReviewAttributes> implements ReviewAttributes {
  public id!: string;
  public userId!: string;
  public movieId!: string;
  public reviewText!: string;
  public rating!: number;
  public createdAt?: Date;
  public updatedAt?: Date;
}

Review.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    references: {
      model: User,
      key: 'id'
    }
  },
  movieId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  reviewText: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
      max: 5
    }
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'Review',
  timestamps: true
});

User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User, { foreignKey: 'userId' });

export default { Review };