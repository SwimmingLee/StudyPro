/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const study_posts = sequelize.define('study_posts', {
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
    study_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'studies',
        key: 'id'
      }
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    board: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    view: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'study_posts'
  });

  return study_posts;
};
