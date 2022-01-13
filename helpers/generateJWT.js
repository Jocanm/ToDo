// Funcion encargada de generar el JWT para la autenticación 

import jwt from 'jsonwebtoken'

export const generateJWt = (id,name,email) => {

    return new Promise((resolve, reject) => {

        const payload = { id, name, email }

        jwt.sign(payload,process.env.SECRET_JWT_SEED,{
            expiresIn:'2h'
        },(error,token)=>{
            if(error){
                console.log(error);
                reject('Error while creating the new Token')
            }
            resolve(token)
        })

    })

}