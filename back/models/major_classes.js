/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('major_classes', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'major_classes'
  });
};
