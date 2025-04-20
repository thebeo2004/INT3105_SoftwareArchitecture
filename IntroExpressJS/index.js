import express, { Router } from 'express'
import router from './route.js';

const app = express();

const PORT = 3000;

app.use((req, res, next) => {
    console.log('A new req received at ' + Date.now());
    next();
})

// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello, World')
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})