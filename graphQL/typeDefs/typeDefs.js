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

  type Query{

    getUsuarios:[Portafolio],
    getUsuario(idportafolio:Int!): Portafolio
  }

  type Mutation{
    
    createUsuario(imagen:String!, imgagen_alt:String!, titulo: String!, subtitulo: String!, enlace: String!):Portafolio!
  }


`

module.exports = typeDefs