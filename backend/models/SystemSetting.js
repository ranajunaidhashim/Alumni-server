import { DataTypes } from 'sequelize';
import sequelize from '../utils/db.js';

const SystemSetting = sequelize.define('SystemSetting', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  contact: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  cover_img: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  about_content: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'system_settings',
  timestamps: false
});

export default SystemSetting;