/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const alarms = sequelize.define('alarms', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    from: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    to: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    check: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '0'
    }
  }, {
    tableName: 'alarms'
  });

  alarms.create_alarm = async function(from, to, data) {
    data.from = from
    data.to = to

    if (!data.content || !data.title) {
        return {
        "state": "fail",
        "detail": "Wrong Input"
      }
    } else {
      const created_alarm = await this.create(data)
      return {
        "state": "success",
        "detail": created_alarm
      }
    }
  }

  alarms.delete_alarm = async function(alarm_id, user_id) {
    const alarm = await this.findOne({where:{id: alarm_id}})
    if (!alarm) {
        return {
          "state": "fail",
          "detail": "wrong id"
      }
    } else {

        if (alarms.from != user_id) {return {
          "state": "fail",
          "detail": `작성자가 아닙니다`
      }} else {
        this.destroy({where: {id:alarm_id}})
        return {
          "state": "success",
          "detail": `${alarm_id}번 쪽지 삭제완료`
      }}
    }
  }
  //
  alarms.read_alarm = async function(alarm_id) {
    const alarm = await this.findOne({where:{id:alarm_id}})
    
    if (!alarm) {return {
      "state": "fail",
      "detail": "wrong id"
    }} else {
      return alarm
    }
  }
  
  alarms.read_alarms_all = async function(user_id, target) {
    let alarms = []
    if (target === 'to') {alarms = await this.findAll({where:{to: user_id}})}
    else if (target === 'from') {alarms = await this.findAll({where:{from: user_id}})}

    return alarms
  }

  return alarms;
};
