/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const common_posts =  sequelize.define('common_posts', {
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
      defaultValue: DataTypes.NOW,
    },
    view: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0',
    }
  }, {
    tableName: 'common_posts'
  });

  common_posts.create_common_post = async function(writer, content, board){
    let result;
    
    result = this.create(
      {
        writer : writer, 
        content : content,
        board : board
      }
    )
    return result;
  }
  
  return common_posts;
};
