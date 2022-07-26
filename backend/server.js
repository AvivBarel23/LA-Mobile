import data from "./data.js"
import express from "express"
import dotenv from 'dotenv'
import connectDatabase from "./config/MongoDb.js"

dotenv.config();
connectDatabase();
const app = express()

//load products from server
app.get("/api/products", (req, res) => {
    res.send(data.products)
})

//load single product from server
app.get("/api/products/slug/:slug", (req, res) => {
    const product = data.products.find(p=> p.slug === req.params.slug);
    if (product){
        res.send(product)
    }
    else{
        res.status(404).send({message:"Product doesn't exists"})
    }

})

app.get("/api/products/:id", (req, res) => {
    const product = data.products.find(p=> p._id === req.params.id);
    if (product){
        res.send(product)
    }
    else{
        res.status(404).send({message:"Product doesn't exists"})
    }

})
const PORT = process.env.PORT;

app.listen(PORT, console.log(`server running on port ${PORT}...`))