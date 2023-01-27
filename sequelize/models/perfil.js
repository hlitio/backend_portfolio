const sequelize = require("sequelize");

module.exports =( sequelize, DataTypes)=>{
   
    const Perfil = sequelize.define("Perfil",{
        idperfil:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        nombre:{
            type: DataTypes.STRING,
            allowNull: false
        },
        apellido:{
            type: DataTypes.STRING,
            allowNull: false
        },
       
    },{ timestamps: false,
        freezeTableName: true
     })

    return Perfil
}