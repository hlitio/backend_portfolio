const resolvers = {
    Query:{
        async getTrabajos( root, args, { models}){
            return await models.portafolio.findAll()
        },

        async getTrabajo(root, args, { models}){
            return await models.portafolio.findByPk(args.idportafolio)
        }
    },

    Mutation: {
        async createTrabajo(root,{imagen,imagen_alt,titulo,subtitulo,enlace},{ models }){
            return await models.portafolio.create ({imagen,imagen_alt,titulo,subtitulo,enlace})
        },

        async createUsuario(root,{correo,password,idperfil},{ models }){
            return await models.usuario.create ({correo,password,idperfil})
        }
    }


}

module.exports = resolvers