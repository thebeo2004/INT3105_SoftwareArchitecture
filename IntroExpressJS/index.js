import express, { Router } from 'express'
import router from './route.js';

const app = express();

const PORT = 3000;

// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello, World')
})

app.use('/user', router)

app.post('/users', express.json(), (req, res) => {
    const {name, email} = req.body 
    res.json({
        message: `User ${name} with email ${email} created successfully`
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on http://locahost:${PORT}`)
})