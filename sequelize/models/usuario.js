const sequelize = require("sequelize");

module.exports =( sequelize, DataTypes)=>{
   
    const Usuario = sequelize.define("Usuario",{
        idusuario:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        correo:{
            type: DataTypes.STRING,
            allowNull: false
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false
        },
        idperfil:{
            type: DataTypes.INTEGER,            
            allowNull: false
        }
    },{ timestamps: false,
        freezeTableName: true
     })

    return Usuario
}