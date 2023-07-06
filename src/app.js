import express from "express"
import handlebars from "express-handlebars"
import mongoose from "mongoose"
import {Server} from "socket.io"

import viewsRouter from "./routes/views.router.js"
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"

import __dirname from "./utils.js"

const app = express()
const connection = await mongoose.connect("mongodb+srv://leoncarceglia:coder@cluster0.ipkw6cl.mongodb.net/?retryWrites=true&w=majority")


app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")

app.use(express.json())
app.use(express.static(`${__dirname}"/public"`))

app.use("/", viewsRouter)
app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)

const httpServer = app.listen(3000, () => {
    console.log("Server is listening on port 3000")
})

const io = new Server(httpServer)

const messages = []
io.on("connection", socket => {
    console.log("Nuevo cliente conectado")
    io.listenerCount("messagesLogs", messages)
    socket.on("message", data =>{
        messages.push(data)
        io.emit("messageLogs", messages)
        console.log(data)
    })
})