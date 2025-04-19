import express, { Router } from 'express'

const app = express();

const PORT = 3000;

// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello, World')
})

// Define a dynamic route
app.get('/user/:username', (req, res) => {
    const username = req.params.username;
    res.send(`Welcome ${username}`)
})

// Define a query route: search?keyword=express
app.get('/search', (req, res) => {
    const keyword = req.query.keyword;
    res.send(`Searching for ${keyword}`);
})

app.listen(PORT, () => {
    console.log(`Server is running on http://locahost:${PORT}`)
})