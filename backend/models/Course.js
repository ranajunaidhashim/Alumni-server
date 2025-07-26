import { DataTypes } from 'sequelize';
import sequelize from '../utils/db.js';

const Course = sequelize.define('Course', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  course: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  about: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: ''
  }
}, {
  tableName: 'courses',
  timestamps: false
});

// Associations
Course.associate = (models) => {
  Course.hasMany(models.AlumnusBio, {
    foreignKey: 'course_id',
    as: 'alumni'
  });
};

export default Course;