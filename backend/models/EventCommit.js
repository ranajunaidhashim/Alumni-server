import { DataTypes } from 'sequelize';
import sequelize from '../utils/db.js';

const EventCommit = sequelize.define('EventCommit', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  event_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'event_commits',
  timestamps: false
});

// Associations
EventCommit.associate = (models) => {
  EventCommit.belongsTo(models.Event, {
    foreignKey: 'event_id',
    as: 'event'
  });
  
  EventCommit.belongsTo(models.User, {
    foreignKey: 'user_id',
    as: 'user'
  });
};

export default EventCommit;