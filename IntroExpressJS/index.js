import express, { Router } from 'express'
import router from './route.js';

const app = express();

const PORT = 3000;

// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello, World')
})

app.use('/user', router)

app.use(express.json())

app.post('/users', (req, res) => {
    const {name, email} = req.body 
    res.json({
        message: `User ${name} with email ${email} created successfully`
    })
})

app.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const {name, email} = req.body 
    res.json({
        message: `User ${userId} updated to '${name}, ${email}`
    })
})

app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    res.json({
        messge: `User with ID ${userId} deleted successfully`
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on http://locahost:${PORT}`)
})