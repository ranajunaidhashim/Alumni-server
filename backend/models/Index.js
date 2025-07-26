import sequelize from '../utils/db.js';
import AlumnusBio from './AlumnusBio.js';
import Career from './Career.js';
import Course from './Course.js';
import Event from './Event.js';
import EventCommit from './EventCommit.js';
import ForumComment from './ForumComment.js';
import ForumTopic from './ForumTopic.js';
import Gallery from './Gallery.js';
import SystemSetting from './SystemSetting.js';
import User from './User.js';

// Initialize all models
const models = {
  AlumnusBio,
  Career,
  Course,
  Event,
  EventCommit,
  ForumComment,
  ForumTopic,
  Gallery,
  SystemSetting,
  User
};

// Initialize associations for each model
Object.values(models).forEach(model => {
  if (typeof model.associate === 'function') {
    model.associate(models);
  }
});

export {
  sequelize,
  AlumnusBio,
  Career,
  Course,
  Event,
  EventCommit,
  ForumComment,
  ForumTopic,
  Gallery,
  SystemSetting,
  User
};