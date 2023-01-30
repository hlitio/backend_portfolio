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

const secret = new TextEncoder().encode(
    'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2',
    )
const alg = 'HS256'

async function validarUsuario(token){
 
}




const resolvers = {
    Query:{
        async getTrabajos( root, args, { models}){
            return await models.portafolio.findAll()
        },

        async getTrabajo(root, args, { models}){
            return await models.portafolio.findByPk(args.idportafolio)
        },

        getUsuario: async( root,{token},{models})=>{
        
           //----- obtenemos y Verificamos el token -----------------------------
          const { payload, protectedHeader } = await jose.jwtVerify(token, secret, {
            issuer: 'urn:example:issuer',
            audience: 'urn:example:audience',
          })
  
          console.log("buscando el usurio con ID: ", payload.user)
  
          if (payload.exp>Date.now()){ 
            console.log("paso algo malo")
            return({
              idusuario:null,
              password:null,
              idperfil:null

          })  
    
  }
          
          return await models.usuario.findByPk(payload.user)
          
         
        }
    },

    Mutation: {

        login: async (root,{correo, password}, { models })=>{
            
            if (correo.length<1){
              return {
                success:false,
                errors:[{path:'correo', message:'El campo correo no contiene datos'}]
              }
            }


            const usuario = await models.usuario.findOne(
                {
                  where:{correo:correo}
                })
            

            console.log("Se esta buscando el usuario", correo)
            console.log("IDUSUARIO: ", usuario.idusuario)

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
          //---------------

              console.log("palabra secreta: ", secret)
            
            const jwt = await new jose.SignJWT({ user:usuario.idusuario })
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

        createUsuario: async (root,{correo,password},{ models })=>{
            const otherErrors = []
            try{
                let passencryp = await bcryptjs.hash(password,8)
                
                
                const usuariocreado = await models.usuario.create ({correo, password:passencryp})
                
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
        },

        updateUsuario: async (root ,args,{models})=>{
            const usuariomodificado= await models.usuario.update({
                idperfil:args.idperfil
              },
              {where:{
                idusuario:args.idusuario
              }})
            console.log(usuariomodificado)
            return({
              success:true
            })

        },


        createPerfil: async (root,{nombre,apellido, token}, { models})=>{
          //----- obtenemos y Verificamos el token -----------------------------
          const { payload, protectedHeader } = await jose.jwtVerify(token, secret, {
            issuer: 'urn:example:issuer',
            audience: 'urn:example:audience',
          })
          
          console.log(payload.user)
          
          if (payload.exp>Date.now()){ 
            return({
              success:false,
              erros: "Expiro el tiempo de sesión"

            })  
            
          }

          

          

          

          const otherErrors=[]

          try{
            const perfilcreado = await models.perfil.create({nombre,apellido})
            //------------------------------------------------------------------------------
            const usuariomodificado= await models.usuario.update({
              idperfil:perfilcreado.idperfil
            },
            {where:{
              idusuario:payload.user
            }})
            console.log("usuario modificado: ",usuariomodificado)

            //------------



            return{
              success: perfilcreado && perfilcreado.idperfil,
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