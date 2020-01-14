module.exports = (sequelize, DataTypes) => {
    return sequelize.define('USERS', {
        email: {
            type: DataTypes.STRING(40),
            allowNull: false,
            unique: true,
        },
        password: { 
            type: DataTypes.STRING(100), 
            allowNull: false, 
        }, 
        name: { 
            type: DataTypes.STRING(10), 
            allowNull: false, 
        },
        nickname: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
        }
    },{
        timestamps: false,
    })
}