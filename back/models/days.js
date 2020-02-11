/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const days = sequelize.define('days', {
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
    day: {
      type: DataTypes.STRING(3),
      allowNull: false
    }
  }, {
    tableName: 'days'
  });

  
  days.create_days = async function(study_id, days) {
    if (typeof days === 'undefined') {
      console.log("gkgkgk")
      return;
    }
    for (const day of days) {
      this.create({study_id, day})
    }
  }

  return days;
};
