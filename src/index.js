import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import { authRouter } from "./routes/auth.routes.js";
import { todosRouter } from "./routes/todos.routes.js";

dotenv.config()

const app = express();

app.use(cors())
app.use(express.json())

//rutas
app.use("/api/auth",authRouter)
app.use("/api/todos",todosRouter)

app.get("/",(req,res)=>{
    res.send("<h1>Welcome to my todo app</h1>")
})

app.listen(process.env.PORT,()=>{
    console.log("Server listening on port " + process.env.PORT);
})