import express, { Router } from 'express'
import { searchController, usernameController } from './controller.js';

const app = express();

const PORT = 3000;

// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello, World')
})

// Define a dynamic route
app.get('/user/:username', usernameController)

// Define a query route: search?keyword=express
app.get('/search', searchController)

app.listen(PORT, () => {
    console.log(`Server is running on http://locahost:${PORT}`)
})