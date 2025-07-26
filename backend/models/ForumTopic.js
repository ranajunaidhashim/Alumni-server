import { DataTypes } from 'sequelize';
import sequelize from '../utils/db.js';

const ForumTopic = sequelize.define('ForumTopic', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(250),
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
  tableName: 'forum_topics',
  timestamps: false
});

// Associations
ForumTopic.associate = (models) => {
  ForumTopic.hasMany(models.ForumComment, {
    foreignKey: 'topic_id',
    as: 'comments'
  });
  
  ForumTopic.belongsTo(models.User, {
    foreignKey: 'user_id',
    as: 'user'
  });
};

export default ForumTopic;