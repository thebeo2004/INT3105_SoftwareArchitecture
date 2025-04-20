import express, { Router } from 'express'
import router from './route.js';

const app = express();

const PORT = 3000;

// Define a simple route
app.get('/', (req, res) => {
    console.log('Middle')
    res.send('Hello, World')
})

app.get('/error', () => {
    throw new Error('This is test error')
})

app.use((err, req, res, next) => {
    console.error(err.message);
    res.send('Internal Server Error')
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})