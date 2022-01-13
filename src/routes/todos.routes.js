//Esta pagina estará encargada de las rutas para el CRUD de los todos los

import express from 'express'
import { check } from 'express-validator'
import { validateFields } from '../../middlewares/validateFields.js'
import { validateJwtToken } from '../../middlewares/validateToken.js'
import { createTodo, deleteTodo, getTodos, updateTodo } from '../controllers/todos.controlers.js'

export const todosRouter = express.Router()

//Todas las rutas de todos deben validar el token
todosRouter.use( validateJwtToken )

//Ruta para traer todos los todos de un usuario
todosRouter.get("/",getTodos)

//Ruta para crear un nuevo todo
todosRouter.post(
    "/",
    [
        check('title','Title musy be provided').not().isEmpty(),
        validateFields
    ],
    createTodo
)

todosRouter.put(
    "/:id",
    [
        check('title','Title musy be provided').not().isEmpty(),
        validateFields
    ],
    updateTodo
)

todosRouter.delete("/:id",deleteTodo)