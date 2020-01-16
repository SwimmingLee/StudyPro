/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const studies = sequelize.define('studies', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    minor_class_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'minor_classes',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true
    },
    goal: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    user_limit: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    start_time: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    end_time: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    isopen: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    created_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    tableName: 'studies'
  });

  studies.delete_study = async function(study_id) {

    const study = await this.findOne({where:{id: study_id}})
    if (!study) {
        return "Wrong ID"
    } else {

        studies.destroy({where: {id:study_id}})
        return `${study_id}번 스터디 삭제완료`
    }
  }


  studies.create_study = async function(data) {

    const study = await this.findOne({where: {name:data.name}})
    if (study) {
        return "이미 존재하는 스터디 이름입니다"
    } else {
        this.create(data)
        return `${data.name}이 생성되었습니다.`
    }
  }

  studies.update_study = async function(study_id, data) {
    const study = await this.findOne({where:{id: study_id}})
    if (!study) {
        return "Wrong ID"
    } else {
        this.update(data, {where: {id:study_id}})
        return `${study_id}번 스터디 변경완료`
    }
  }

  return studies;
};
