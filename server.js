const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const { gql } = require('apollo-server-express')

console.log("hola")
// ----------------- Sincronización con la base de datos ---------------
const models = require("./sequelize/models/index")

models.sequelize.authenticate().then(()=>console.log("estas conectado"))

models.sequelize.sync()

//---------------------------------------------------------------


/////////GraphQL

import resolvers from "./graphQL/resolvers/resolvers"

import typeDefs from "./graphQL/typeDefs/typeDefs"


const server = new ApolloServer({typeDefs,resolvers, context:{models}})
const app = express()

server.start().then(res => {
    server.applyMiddleware({ app });
    app.listen({ port:4000 }, () => 
      console.log(`Corriendo Servidor Apollo`)
    );  
  });