const { gql } = require('apollo-server-express');

const typeDefs = gql`
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
    
    createTrabajo(imagen:String!, imagen_alt:String!, titulo: String!, subtitulo: String!, enlace: String!):Portafolio!

    createUsuario( correo: String!, password: String!, idperfil: Int!):Usuario!


  }


`

module.exports = typeDefs