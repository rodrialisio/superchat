const express = require("express")
const {Server} = require("socket.io")

const app = express()
const port= process.env.PORT || 8080

const server = app.listen(port, ()=> {
    console.log(`Servidor escuchando en ${port}`)
})

const io = new Server(server)
const messages=[]

app.use(express.static(__dirname+"/public"))

io.on("connection", socket=> {
    console.log("cliente conectado")
    socket.emit("welcome",{message:"bienvenido amigo!"})
    socket.emit("messagelog",messages)
    socket.on("message",data=> {
        messages.push(data)
        io.emit("messagelog",messages)
    })
})