/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const users =  sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
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
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    nickname: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true
    },
    gender: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    auth: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'users'
  });

  return users;
};
