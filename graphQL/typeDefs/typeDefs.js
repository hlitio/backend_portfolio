const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type Error{
    path: String!
    message: String!
  }

  type Response {
    success: Boolean!
    token: String
    errors: [Error]
  }
  type Portafolio {
    idportafolio: Int!,
    imagen: String!,
    imagen_alt: String!,
    titulo: String!,
    subtitulo: String!,
    enlace: String!
  }

  type Usuario{
    idusuario: Int!,
    correo: String!,
    password: String!,
    idperfil: Int!
  }

  type Query{
    
    getTrabajos:[Portafolio],
    getTrabajo(idportafolio:Int!): Portafolio
  }

  

  type Mutation{
    
    login(correo: String!, password: String!): Response!

    createTrabajo(imagen:String!, imagen_alt:String!, titulo: String!, subtitulo: String!, enlace: String!):Portafolio!

    createUsuario( correo: String!, password: String!, idperfil: Int!):Usuario!


  }


`

module.exports = typeDefs