import { DataTypes } from 'sequelize';
import sequelize from '../utils/db.js';

const Career = sequelize.define('Career', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  company: {
    type: DataTypes.STRING(250),
    allowNull: false
  },
  location: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  job_title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  date_created: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'careers',
  timestamps: false
});

// Associations
Career.associate = (models) => {
  Career.belongsTo(models.User, {
    foreignKey: 'user_id',
    as: 'user'
  });
};

export default Career;