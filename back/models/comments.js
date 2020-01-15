/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const comments = sequelize.define('comments', {
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
    study_post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'study_posts',
        key: 'id'
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'comments'
  });

  return comments;
};
