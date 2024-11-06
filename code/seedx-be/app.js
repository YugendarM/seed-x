require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const http = require("http")
const socketIO = require("socket.io")

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

const PORT = process.env.PORT || 3500

//routers
const authRouter = require("./routers/authRouter")
const productRouter = require("./routers/productRouter")
const productionRouter = require("./routers/productionRouter")
const searchRouter = require("./routers/searchRouter")

app.use(cors({
    origin: process.env.FE_BASE_URL, 
    methods: ['GET', 'POST', 'DELETE', 'PUT'], 
    credentials: true, 
  }));

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/api/v1", (request, response) => {
    response.send("Server Running")
})

//io attached routes
const attachedProductRoute = productRouter(io)
const attachedProductionRoute = productionRouter(io)

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/product", attachedProductRoute)
app.use("/api/v1/production", attachedProductionRoute)
app.use("/api/v1/search", searchRouter)

io.on("connection", (socket) => {
    console.log("New client connected", socket.id)

    socket.on("disconnect", () => {
        console.log("Client disconnected", socket.id)
    })
})

mongoose.connect(process.env.DB_URL)
const db = mongoose.connection
db.on('error', (errorMessage) => console.log(errorMessage))
db.once('open', () => console.log('Connected to db successfully'))

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:3500`)
}) 