/* jshint indent: 2 */
import crypto from "crypto"
import jwt from "jsonwebtoken"

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
    phone: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: true,
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
    return new Promise((resolve, reject) => {
      crypto.pbkdf2(password, process.env.SECRET_KEY, 92412, 64, 'sha512', async (err, key) => {
        if (err) {
          reject(err);
        } else {
          resolve(
            this.dataValues.password === key.toString('base64')
          )
        }
      })
    })

  };

  users.prototype.getToken = function() {
    return jwt.sign(
      {nickname:this.dataValues.id},
      process.env.JWT_KEY,
      {expiresIn : '5m'}
    )
  }

  users.save = function async (user, platform_type, auth) {
    const {
      email, 
      phone,
      password, 
      name,
      nickname, 
      gender} = user;
    
    const self = this;
    crypto.pbkdf2(password, process.env.SECRET_KEY, 92412, 64, 'sha512', async (err, key) => {
      const hashed_password = await key.toString('base64');
      self.create({
            email,
            platform_type,
            phone,
            password: hashed_password,
            name,
            nickname,
            gender,
            auth : auth || 0
        })
    });
  }

  return users;
};
