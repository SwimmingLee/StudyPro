/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const works =  sequelize.define('works', {
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
      allowNull: false,
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
    tableName: 'works'
  });

  works.create_work = async function(data, wrong_id, same_work) {
      
      if (!data.content || !data.writer || !data.start_date || !data.end_date || !data.study_id) {return "Data 부족"}
      else if (wrong_id) {
        return "Wrong id"
      } else if (same_work) {return "같은 날짜에 같은 일정이 존재합니다."}
      else {
        this.create(data)
        return `${data.study_id}번 스터디에 일정이 추가되었습니다.`
      }
  }

  works.delete_work = async function(work_id) {
    const work = await this.findOne({where:{id:work_id}})

    if (!work) {return "Wrong id"}
    else {
      this.destroy({where:{id:work_id}})
      return `${work_id}번 일정이 삭제되었습니다.`
    }
  }

  works.update_work = async function(work_id, data) {
    const work = await this.findOne({where:{id:work_id}})
    if (!work) {return "Wrong id"}
    else {
      this.update(data, {where:{id:work_id}})
      return `${work_id}번 일정이 수정되었습니다.`
    }
  }

  works.read_works_by_study = async function(study_id) {
    const works = await this.findAll({where:{study_id}})
    
    return works
  }
  return works;
};
