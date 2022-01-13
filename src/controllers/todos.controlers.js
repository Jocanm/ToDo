import PrismaProvider from '@prisma/client'
const {PrismaClient} = PrismaProvider;
const prisma = new PrismaClient()
const {todo} = prisma; 

export const getTodos = async(req, res) => {

    const {id:userId} = req

    try {
        
        const todos = await todo.findMany({
            where:{
                userId
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


    const data = {...req.body,userId:req.id}

    try {

        const todoCreated = await todo.create({
            data
        })

        res.status(201).json({
            ok:true,
            msg:"Todo was created successfully",
            todo:todoCreated
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"Internal error"
        })
    }

}

export const updateTodo = async(req, res) => {

    const {id} = req.params

    try {
        
        let todoUpdated = await todo.findUnique({
            where:{id}
        })

        if(!todoUpdated){
            return res.status(404).json({
                ok:false,
                msg:'Todo with the sent id does not exist'
            })
        }

        todoUpdated = await todo.update({
            where:{id},
            data:req.body
        })

        res.json({
            ok:true,
            msg:"Todo updated successfully",
            todo:todoUpdated
        })
        // 

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"Internal error"
        })
    }
}

export const deleteTodo = async(req, res) => {

    const {id} = req.params

    try {
        
        let todoToDelete = await todo.findUnique({
            where: {id}
        })

        if(!todoToDelete) {
            return res.status(404).json({
                ok:false,
                msg:"Todo to delete does not exist"
            })
        }

        await todo.delete({
            where: {id}
        })

        res.json({
            ok:true,
            msg:"Todo deleted successfully"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"Internal error"
        })
    }

}
