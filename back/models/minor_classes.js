/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('minor_classes', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    major_class_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'major_classes',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'minor_classes'
  });
};
