import { DataTypes } from 'sequelize';
import sequelize from '../utils/db.js';

const AlumnusBio = sequelize.define('AlumnusBio', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  gender: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  batch: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  course_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(250),
    allowNull: false
  },
  connected_to: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  avatar: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: 0,
    comment: '0= Unverified, 1= Verified'
  },
  date_created: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'alumnus_bio',
  timestamps: false
});

// Associations
AlumnusBio.associate = (models) => {
  AlumnusBio.hasOne(models.User, {
    foreignKey: 'alumnus_id',
    as: 'user',
    constraints: false
  });
  
  AlumnusBio.belongsTo(models.Course, {
    foreignKey: 'course_id',
    as: 'course'
  });
};

export default AlumnusBio;