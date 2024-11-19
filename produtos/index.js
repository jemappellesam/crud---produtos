require("dotenv").config()
const express = require("express")
const mongodb = require("./src/database/mongo")
const produtos_rotas = require("./src/routes/produto")
const auth = require("./src/midllewares/auth")

const PORT = process.env.PORT

const app = express()
app.use(express.json())

app.get("/", (req, res) => {
    res.send("API OK")
})

app.use("/produto", auth, produtos_rotas)

mongodb()

app.listen(PORT, () => console.log("Servidor rodando"))