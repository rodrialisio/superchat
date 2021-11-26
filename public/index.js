const socket = io()

socket.on("welcome",data=> {
    console.log(data.message)
})

let user = document.getElementById("user")
let input = document.getElementById("info")
input.addEventListener("keyup",(e)=> {
    if (e.key==="Enter") {
        socket.emit("message", {user:user.value, message:e.target.value})
    }
})

socket.on("messagelog",data => {
    let p = document.getElementById("log")
    let messages = data.map(message => {
        return `<div><span>${message.user} dice: ${message.message}</span></div>`
    }).join("")
    p.innerHTML= messages
}) 