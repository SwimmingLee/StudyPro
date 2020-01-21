/* jshint indent: 2 */
import crypto from "crypto"

module.exports = function (sequelize, DataTypes) {
  const users = sequelize.define('users', {
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
    platform_type: {
      type: DataTypes.STRING(10),
      allowNull: true
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

  users.prototype.verify = function(password) {
    let cipher = crypto.createCipher('aes192', process.env.SECRET_KEY)
    cipher.update(password, 'utf8', 'base64')
    const ciphered_password = cipher.final('base64')

    return this.dataValues.password === ciphered_password;
  };

  users.save = function (user) {
    const {email, nickname, name, password, gender, auth} = user;

    let cipher = crypto.createCipher('aes192', process.env.SECRET_KEY)
    cipher.update(password, 'utf8', 'base64')
    const ciphered_password = cipher.final('base64')

    return this.create({
      email,
      name,
      password: ciphered_password,
      nickname,
      gender,
      auth
    })
  }

  return users;
};
