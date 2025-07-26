import { DataTypes } from 'sequelize';
import sequelize from '../utils/db.js';

const ForumComment = sequelize.define('ForumComment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  topic_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  comment: {
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
  tableName: 'forum_comments',
  timestamps: false
});

// Associations
ForumComment.associate = (models) => {
  ForumComment.belongsTo(models.ForumTopic, {
    foreignKey: 'topic_id',
    as: 'topic'
  });
  
  ForumComment.belongsTo(models.User, {
    foreignKey: 'user_id',
    as: 'user'
  });
};

export default ForumComment;