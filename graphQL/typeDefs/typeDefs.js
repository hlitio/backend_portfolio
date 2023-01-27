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
    idperfil: Int
  }

  type Perfil{
    idperfil: Int!
    nombre: String!
    apellido: String!
  }

  type Query{

    getTrabajos:[Portafolio],
    getTrabajo(idportafolio:Int!): Portafolio
  }

  type Mutation{

    login(correo: String!, password: String!): Response!
    
    createTrabajo(imagen:String!, imagen_alt:String!, titulo: String!, subtitulo: String!, enlace: String!):Portafolio!

    createUsuario( correo: String!, password: String!):Response!

    updateUsuario( idusuario: Int!, correo: String, password: String, idperfil: Int):Response!

    createPerfil( nombre: String!, apellido: String!, token: String!): Response!
  }


`

module.exports = typeDefs