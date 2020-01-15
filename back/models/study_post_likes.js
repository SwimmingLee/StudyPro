/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('study_post_likes', {
    study_post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'study_posts',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'study_post_likes'
  });
};
