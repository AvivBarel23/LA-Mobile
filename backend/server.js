import products from "./data/products.js"
import express from "express"

const app = express()

//load products from server
app.get("/api/products", (req, res) => {
    res.json(products)
})
//load single product from server
app.get("/api/products/:id", (req, res) => {
    const product = products.find((p) => p._id === req.params.id)
    res.json(product)
})

app.listen(5000, console.log("server running on port 5000..."))