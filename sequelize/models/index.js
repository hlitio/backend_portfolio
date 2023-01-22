//Conexión con la base de datos
import Sequelize from "sequelize"

const sequelize = new Sequelize ("portfolio", "root", "123456789",{
    host: "localhost",
    dialect: "mysql"
})

const models = {
    portafolio: sequelize.import("./portafolio.js"),
    usuario: sequelize.import("./usuario.js")
}

models.sequelize = sequelize
models.Sequelize = Sequelize

module.exports = models