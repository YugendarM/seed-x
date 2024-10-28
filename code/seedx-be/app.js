require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()

const PORT = process.env.PORT || 3500

const authRouter = require("./routers/authRouter")

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

app.use("/api/v1/auth", authRouter)


mongoose.connect(process.env.DB_URL)
const db = mongoose.connection
db.on('error', (errorMessage) => console.log(errorMessage))
db.once('open', () => console.log('Connected to db successfully'))

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:3500`)
}) 