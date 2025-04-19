import express, { Router } from 'express'

const app = express();

const PORT = 3000;

// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello, World')
})

// Define a simple route
app.get('/about', (req, res) => {
    res.send('This is about route')
})

// About Route
app.get('/contact', (req, res) => {
    res.send('This is contact route')
})

app.listen(PORT, () => {
    console.log(`Server is running on http://locahost:${PORT}`)
})