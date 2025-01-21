import { DataTypes, Model, UUIDV4 } from 'sequelize';
import { User } from './user';
import sequelize from './index';

interface ListAttributes {
  id: string;
  userId: string;
  name: string;
  slug: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ListItemAttributes {
  id: string;
  listId: string;
  movieId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class List extends Model<ListAttributes> implements ListAttributes {
  public id!: string;
  public userId!: string;
  public name!: string;
  public slug!: string;
  public description?: string;
  public private!: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;
}

export class ListItem extends Model<ListItemAttributes> implements ListItemAttributes {
  public id!: string;
  public listId!: string;
  public movieId!: string;
  public createdAt?: Date;
  public updatedAt?: Date;
}

List.init({
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
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: DataTypes.TEXT,
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: new Date()
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: new Date()
  }
}, {
  sequelize,
  modelName: 'List',
  timestamps: true
});

ListItem.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  listId: {
    type: DataTypes.UUID,
    references: {
      model: List,
      key: 'id'
    }
  },
  movieId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'ListItem',
  timestamps: true
});

User.hasMany(List, { foreignKey: 'userId' });
List.belongsTo(User, { foreignKey: 'userId' });

List.hasMany(ListItem, { foreignKey: 'listId' });
ListItem.belongsTo(List, { foreignKey: 'listId' });

export default { List, ListItem };