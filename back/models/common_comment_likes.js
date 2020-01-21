/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const common_comment_likes =  sequelize.define('common_comment_likes', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'common_comments',
        key: 'id'
      }
    },
    users_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    tableName: 'common_comment_likes'
  });

  return common_comment_likes;
};
