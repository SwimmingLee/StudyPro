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



  study_posts.create_study_post = async function(study_id,writer, title,content, board){
    let result;
    try{
      result = await this.create(
        {
          study_id : study_id,
          writer : writer,
          title : title,
          content : content,
          board : board
        }
      )
      return result;
      }catch(error){
        console.log(error)
      }
    }
  
  study_posts.read_study_post = async function(post_id, study_id){
    let result;
    
    result = await this.findOne(
      {
        where:
          {
            id : post_id,
            study_id : study_id
          }
      }
    )
    result.dataValues.like = false;
    return result;
  }

  study_posts.update_study_post = async function(post_id, title, content){
    let result;
    try{
      result = await this.update(
        {
          title : title, 
          content : content
        },
        {
          where : 
          {
            id : post_id
          }
        }
      )
      return result;
    }catch(error){
      console.log(error);
    }
  }

  study_posts.delete_study_post = async function(post_id){
    let result;
    
    result = await this.destroy(
      {
        where : 
        {
          id : post_id
        }
      }
    )
    return result;
  }

  study_posts.list_study_post = async function(study_id,board){
    let result;
    
    result = await this.findAll(
      {
        where : 
        {
          study_id : study_id,
          board : board
        }
      }
    )
    return result;
  }

  return study_posts;
};
