import express, { Router } from 'express'

const app = express()
const PORT = 3000

// Define middleware
app.use(express.json())

// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello Express')
})

// GET All Product
app.get('/api/products', (req, res) => {
    const products = [
        {id: 1, name: 'Laptop', price: 1000},
        {id: 2, name: 'Mobile', price: 500},
    ]

    res.status(200).json({products})
})

// Get a Single Product
app.get('/api/products/:id', (req, res) => {
    const products = [
        {id: 1, name: 'Laptop', price: 1000},
        {id: 2, name: 'Mobile', price: 500},
    ]

    const product = products.find(p => p.id === Number(req.params.id))

    if (!product) {
        return res.status(404).json({message: 'Product Not Found'})
    } 

    res.status(200).json({product})

})

//Create a new product
app.post('/api/products', (req, res) => {
    const newProduct = req.body 
    newProduct.id = Date.now()
    res.status(201).json({newProduct})
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})