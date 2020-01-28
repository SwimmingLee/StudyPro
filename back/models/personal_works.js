/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const personal_works =  sequelize.define('personal_works', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    writer: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    study_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'studies',
        key: 'id'
      }
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    tableName: 'personal_works'
  });

  personal_works.create_work = async function(data, wrong_id, same_work) {
      
      if (!data.content || !data.writer || !data.start_date || !data.end_date) {return "Data 부족"}
      else if (wrong_id) {
        return {
      "state": "fail",
      "detail": "wrong id"
  }
      } else if (same_work) {return {
        "state": "fail",
        "detail": "같은 날짜에 같은 일정이 존재합니다."
    }}
      else {
        const created_work = await this.create(data)
        return {
          "state": "success",
          "detail": `${created_work.writer}번 유저에게 일정이 추가되었습니다.`
      }
      }
  }

  personal_works.delete_work = async function(work_id, user_id) {
    const work = await this.findOne({where:{id:work_id}})

    if (!work) {return {
      "state": "fail",
      "detail": "wrong id"
  }}
    else {
      
      if (work.writer != user_id) {return {
        "state": "fail",
        "detail": `작성자가 아닙니다`
      }} else {
        this.destroy({where: {id:work_id}})
        return {
          "state": "success",
          "detail": `${work_id}번 일정 삭제완료`
      }}
    }
  }

  personal_works.update_work = async function(work_id, data,user_id) {
    const work = await this.findOne({where:{id:work_id}})
    if (!work) {return {
      "state": "fail",
      "detail": "wrong id"
  }}
    else {
      if (work.writer != user_id) {return {
        "state": "fail",
        "detail": `작성자가 아닙니다`
      }}
      else {
      this.update(data, {where:{id:work_id}})
      return {
        "state": "success",
        "detail": `${work_id}번 일정이 수정되었습니다.`
      }}
    }
  }

  personal_works.read_work = async function(work_id) {
    const work = await this.findOne({where:{id:work_id}})
    
    return work
  }
  return personal_works;
};
