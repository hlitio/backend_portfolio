const jose = require("jose")
const bcryptjs = require('bcryptjs')
// --------- generacion del token ------------------

let secret = new TextEncoder().encode(
    'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2',
  )
  let alg = 'HS256'
  
  
  
  // ------------------------------------
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
        
        login: async (root,{ correo, password },{ models })=>{
           
            const user = await models.usuario.findOne({ 
                where:{
                    correo:correo,
                    password:password
                }
            })
            
            
            
            if (user){
                console.log("id usuario: ",user.dataValues.idusuario)
                
                const jwt = await new jose.SignJWT({ idusuario: user.dataValues.idusuario })
                .setProtectedHeader({ alg })
                .setIssuedAt()
                .setIssuer('urn:example:issuer')
                .setAudience('urn:example:audience')
                .setExpirationTime('2h')
                .sign(secret)
                return(
                    {
                        success: true,
                        token:jwt
                    }
                )
            }
            else
            {
                return(
                    {
                        success: false,
                        token:"token de no"
                    }
                )
            }

        },


        async createTrabajo(root,{imagen,imagen_alt,titulo,subtitulo,enlace},{ models }){
            return await models.portafolio.create ({imagen,imagen_alt,titulo,subtitulo,enlace})
        },

        createUsuario: async (root,{correo,password,idperfil},{ models })=>{
           
            //const passencryp = await bcryptjs.hash(password,8)
                
            return await models.usuario.create ({correo,password,idperfil})
           
        }
    }


}

module.exports = resolvers