/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const studies_and_tags = sequelize.define('studies_and_tags', {
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
    tags_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tags',
        key: 'id'
      }
    }
  }, {
    tableName: 'studies_and_tags'
  });
  return studies_and_tags;
};
