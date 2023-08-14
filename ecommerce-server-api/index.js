const express = require('express')
require("./config/database")
const Product = require("./model/Product")

const app = express()
app.use(express.json()) // global middleware // runs for every api routes // sets-up data in req.body



app.post('/api/products',  function (req, res) {
    Product.create({ title: req.body.title, price: req.body.price })
    res.send("product created..")
})

app.get('/api/products', async function (req, res) {
    try{
        let products = await Product.find()
        res.send(products)
    }catch(err){
        console.log(err)
        res.status(500).send({msg:"Server error"})
    }
})

app.listen(8000, () => {
    console.log("server started");
})