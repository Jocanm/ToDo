// Middleware encargado de validar si el token enviado por los headers es valido.

//Si el token es valido agrega el id, el nombre y el email del usuario al request para despues ser utilizado por las otras rutas

import jwt from 'jsonwebtoken'

export const validateJwtToken = (req, res, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "There is no token in the request"
        })
    }

    try {

        const { id, name, email } = jwt.verify(
            token, process.env.SECRET_JWT_SEED
        );

        req.id = id;
        req.name = name;
        req.email = email;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "Invalid token"
        })
    }

    next()
}