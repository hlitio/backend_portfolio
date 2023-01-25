const bcryptjs = require('bcryptjs')
const jose = require('jose')

const formatErrors = (error,otherErrors)=>{
    const errors=error.errors;
    let objErrors = []
  
    if(errors){
      Object.entries(errors).map(error=>{
        const {path, message} = error[1];
        objErrors.push({path,message})
      })
      objErrors = objErrors.concat(otherErrors)
      return objErrors;
    }else if(otherErrors.length){
      return otherErrors;
    }
  
  
    const uknownError = {}
    switch(error.code){
      case 11000:
        uknownError.path = "username"
        uknownError.message = "El nombre de usuario ya existe"
      break;
      default:
        uknownError.path = "Desconocido"
        uknownError.message = error.message
    }
    return [uknownError]
  
  }






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

        login: async (root,{correo, password}, { models })=>{
            
            const usuario = await models.usuario.findOne(
                {
                    where:{correo:correo}
                })

            console.log(usuario)

            if(!usuario){
                return {
                  success:false,
                  errors:[{path:'correo', message:'Correo no existe'}]
                }
              }

              const validPassword = await bcryptjs.compare(password, usuario.password)
              if(!validPassword){
                return {
                  success:false,
                  errors:[{path:'password', message:'Password inválido'}]
                }
              }
          

            const secret = new TextEncoder().encode(
            'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2',
            )
            const alg = 'HS256'
            
            const jwt = await new jose.SignJWT({ user:123456 })
            .setProtectedHeader({ alg })
            .setIssuedAt()
            .setIssuer('urn:example:issuer')
            .setAudience('urn:example:audience')
            .setExpirationTime('2h')
            .sign(secret)

            console.log("Token:", jwt)

            
              
          
            return {
                success: true,
                token:jwt,
                errors: []
              }
        },





        

        async createTrabajo(root,{imagen,imagen_alt,titulo,subtitulo,enlace},{ models }){
            return await models.portafolio.create ({imagen,imagen_alt,titulo,subtitulo,enlace})
        },

        createUsuario: async (root,{correo,password,idperfil},{ models })=>{
            const otherErrors = []
            try{
                let passencryp = await bcryptjs.hash(password,8)
                console.log ("Token: ", passencryp)
                
                const usuariocreado = await models.usuario.create ({correo, password:passencryp,idperfil})
                //console.log (usuariocreado)
                return {
                    success: usuariocreado && usuariocreado.idusuario,
                    errors: []
                  };
                
            }catch(error){
                return {
                    success: false,
                    errors: formatErrors(error,otherErrors)
                  };
                
            }
        }
    }


}

module.exports = resolvers