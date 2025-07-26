import { DataTypes } from 'sequelize';
import sequelize from '../utils/db.js';

const Gallery = sequelize.define('Gallery', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  image_path: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  about: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  created: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'gallery',
  timestamps: false
});

export default Gallery;