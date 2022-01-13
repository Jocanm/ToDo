import PrismaProvider from '@prisma/client'
const {PrismaClient} = PrismaProvider;
const prisma = new PrismaClient()
const {todo} = prisma; 

export const getTodos = async(req, res) => {

    const {id} = req

    try {
        
        const todos = await todo.findMany({
            where:{
                userId:id
            }
        })

        res.json({
            ok:true,
            todos
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"Internal error"
        })
    }

}

export const createTodo = async(req, res) => {

    res.send("Ruta para crear un todo")

}

export const updateTodo = async(req, res) => {

    res.send("Ruta para actualizar un todo")

}

export const deleteTodo = async(req, res) => {

    res.send("Ruta para eliminar un todo")

}
