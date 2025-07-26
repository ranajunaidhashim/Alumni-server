import { DataTypes } from 'sequelize';
import sequelize from '../utils/db.js';

const User = sequelize.define('User', {
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
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING(10),
        defaultValue: 'Alumnus',
        comment: 'Admin,Alumnus'
    },
    alumnus_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
}, {
    tableName: 'users',
    timestamps: false
});

// Associations
User.associate = (models) => {
    User.hasMany(models.Career, {
        foreignKey: 'user_id',
        as: 'careers'
    });

    User.hasMany(models.ForumTopic, {
        foreignKey: 'user_id',
        as: 'forumTopics'
    });

    User.hasMany(models.ForumComment, {
        foreignKey: 'user_id',
        as: 'forumComments'
    });

    User.hasMany(models.EventCommit, {
        foreignKey: 'user_id',
        as: 'eventCommits'
    });

    User.belongsTo(models.AlumnusBio, {
        foreignKey: 'alumnus_id',
        as: 'bio',
        constraints: false
    });
};

export default User;