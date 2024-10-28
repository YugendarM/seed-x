const express = require("express")

const app = express()

const PORT = process.env.PORT || 3500

app.get("/", (request, response) => {
    response.send({message:"Server running"})
})

app.listen(3500, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})