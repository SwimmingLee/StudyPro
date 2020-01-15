/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const users_and_studies = sequelize.define('users_and_studies', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
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
    }
  }, {
    tableName: 'users_and_studies'
  });
  return users_and_studies;
};
