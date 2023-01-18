const resolvers = {
    Query:{
        async getUsuarios( root, args, { models}){
            return await models.portafolio.findAll()
        },

        async getUsuario(root, args, { models}){
            return await models.portafolio.findByPk(args.idportafolio)
        }
    },

    Mutation: {
        async createUsuario(root,{imagen,imagen_alt,titulo,subtitulo,enlace},{ models }){
            return await models.portafolio.create ({imagen,imagen_alt,titulo,subtitulo,enlace})
        }
    }


}

module.exports = resolvers