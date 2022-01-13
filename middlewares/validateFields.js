//Middleware personalizado para validar si express-validator encontró algun error en los campos

import { validationResult } from "express-validator"


export const validateFields = (req, res, next) => {

    const erros = validationResult(req)

    if(!erros.isEmpty()){
        return res.status(400).json({
            ok:false,
            errors:erros.mapped()
        })
    }

    next()

}