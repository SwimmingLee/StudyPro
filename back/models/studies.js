/* jshint indent: 2 */
import {Op} from "sequelize"

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
    captain: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
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
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    }
  }, {
    tableName: 'studies'
  });

  studies.delete_study = async function(study_id) {

    const study = await this.findOne({where:{id: study_id}})
    if (!study) {
        return {
          "state": "fail",
          "detail": "wrong id"
      }
    } else {

        studies.destroy({where: {id:study_id}})
        return {
          "state": "success",
          "detail": `${study_id}번 스터디 삭제완료`
      }
    }
  }


  studies.create_study = async function(wrong_id, data) {
    if (wrong_id) {return {
          "state": "fail",
          "detail": "wrong id"
      }}
    const study = await this.findOne({where: {name:data.name}})
    if (study) {
        return {
          "state": "fail",
          "detail": "이미 존재하는 스터디 이름입니다"
      }
    } else {
        
        if (data.start_time && data.end_time) {
          if (data.start_time > data.end_time) {
            return {
              "state": "fail",
              "detail": "시간이 잘못설정되었습니다."
          }
          }
        }
        const created_study = await this.create(data)
        return {
          "state": "success",
          "detail": [{
            "state": "success",
            "detail": `${data.name}이 생성되었습니다.`
        }, created_study]
      }
    }
  }

  studies.update_study = async function(study_id, data) {
    const study = await this.findOne({where:{id: study_id}})
    if (!study) {
        return {
          "state": "fail",
          "detail": "wrong id"
      }
    } else {
        this.update(data, {where: {id:study_id}})
        return {
          "state": "success",
          "detail": `${study_id}번 스터디 변경완료`
      }
    }
  }

  studies.read_study = async function(study_id) {
    const study = await this.findOne({where:{id: study_id}})
    if (!study) {
      return {
          "state": "fail",
          "detail": "wrong id"
      }
    } else {
      return study
    }
  }

  studies.search_studies = async function(data, captain_id) {

    let where = {}
    let key
    for (key of Object.keys(data)) {

      switch (key) {
        case "name":
          where["name"] = {[Op.like]: "%" + data.name + "%"};
          break;

        case "start_time":
          where[`${key}`] = {
            [Op.or]: [
              { [Op.gte] : data[`${key}`] },
              null
            ]
          };
          break;

        case "end_time", "start_date":
          where[`${key}`] = {
            [Op.or]: [
              { [Op.lte] : data[`${key}`] },
              null
            ]
          };
          break;

        case "captain":
          where["captain"] = captain_id;
          break;

        default:
          where[`${key}`] = data[`${key}`];
          break;
      }
    }

    const result = await this.findAll({where})
    return result
  }

  return studies;
};
