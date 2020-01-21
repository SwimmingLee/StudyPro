/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const study_comment_likes =  sequelize.define('study_comment_likes', {
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
        model: 'study_comments',
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
    }
  }, {
    tableName: 'study_comment_likes'
  });

  return study_comment_likes;
};
