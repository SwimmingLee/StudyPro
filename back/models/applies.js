/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const applies = sequelize.define('applies', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    study_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'studies',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'applies'
  });


  applies.create_apply = async function(data) {
    const user_id = data.user_id
    const study_id = data.study_id

    const apply = await this.findOne({where:{user_id, study_id}})
    if (apply) {return "이미 가입신청한 스터디입니다"}
    else {
      this.create(data)
      return `${user_id}번 유저가 ${study_id}번 스터디에 가입신청 하였습니다`
    }
  }

  applies.delete_apply = async function(apply_id) {
    const apply = await this.findOne({where:{id:apply_id}})
    if (!apply) {return "Wrong id"}
    else {
      this.destroy({where:{id:apply_id}})
      return `${apply_id}번 신청을 거절하였습니다.`
    }
  }

  applies.update_apply = async function(apply_id, data) {
    const apply = await this.findOne({where:{id:apply_id}})
    if (!apply) {return "Wrong id"}
    else {
      this.update(data, {where:{id:apply_id}})
      return `${apply_id}번 신청을 수정하였습니다.`
    }    
  }

  applies.read_applies = async function(study_id) {
    const applies = await this.findAll({where:{study_id}})
    return applies
  }
  return applies;
};
