//Esta pagina estará encargada de la creacion de las rutas para la autenticación

import express from 'express'
import { check } from 'express-validator'
import { validateFields } from '../../middlewares/validateFields.js'
import { validateJwtToken } from '../../middlewares/validateToken.js'
import { createUser, loginUser, refreshToken } from '../controllers/auth.controlers.js'


export const authRouter = express.Router()


//Ruta para refrescar el JWT
authRouter.get("/refresh",validateJwtToken,refreshToken)

//Ruta para crear un usuario
authRouter.post(
    "/register",
    [
    check('name','User name must be provided').not().isEmpty(),
    check('password','Password must be at least 6 characters').isLength({min:6}),
    check('email','Email provided is not valid').isEmail(),
    validateFields
    ],
    createUser
)

//Ruta para logear un usuario
authRouter.post(
    "/login",
    [
        check('password','Password must be at least 6 characters').isLength({min:6}),
        check('email','Email provided is not valid').isEmail(),
        validateFields
    ],
    loginUser
)