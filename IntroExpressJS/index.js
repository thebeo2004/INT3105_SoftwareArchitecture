import express, { Router } from 'express'
import router from './route.js';

const app = express();

const PORT = 3000;

app.use((req, res, next) => {
    console.log('Start')

    res.on('finish', () => {
        console.log('End')
    })

    next()
})

// Define a simple route
app.get('/', (req, res) => {
    console.log('Middle')
    res.send('Hello, World')
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})