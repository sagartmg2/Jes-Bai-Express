const express = require('express')
require("./config/database")
const handleServerError = require('./middleware/handleServerError');
const authRoutes = require("./routes/auth")
const productRoutes = require("./routes/product")

const app = express()

app.use(express.json()) // global middleware // runs for every api routes // sets-up data in req.body

app.use(authRoutes)
app.use(productRoutes)

app.use((req, res) => {
    res.status(404).send({ msg: "Resource Not found" })
})

app.use(handleServerError)

app.listen(8000, () => {
    console.log("server started");
})