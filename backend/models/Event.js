import { DataTypes } from 'sequelize';
import sequelize from '../utils/db.js';

const Event = sequelize.define('Event', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(250),
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  schedule: {
    type: DataTypes.DATE,
    allowNull: false
  },
  banner: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: ''
  },
  date_created: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'events',
  timestamps: false
});

// Associations
Event.associate = (models) => {
  Event.hasMany(models.EventCommit, {
    foreignKey: 'event_id',
    as: 'commits'
  });
};

export default Event;