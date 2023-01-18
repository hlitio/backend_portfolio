const sequelize = require("sequelize");

module.exports =( sequelize, DataTypes)=>{
    const Portafolio = sequelize.define("Portafolio",{
        idportafolio:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        imagen:{
            type: DataTypes.STRING,
            allowNull: false
        },
        imagen_alt:{
            type: DataTypes.STRING,
            allowNull: false
        },
        titulo:{
            type: DataTypes.STRING,
            allowNull: false
        },
        subtitulo:{
            type: DataTypes.STRING,
            allowNull: false
        },
        enlace:{
            type: DataTypes.STRING,
            allowNull: false
        }
    },{ timestamps: false,
        freezeTableName: true
     })
    return Portafolio
}