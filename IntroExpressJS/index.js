import express, { Router } from 'express'
import router from './route.js';

const app = express();

const PORT = 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs')

// Define a simple route
app.get('/', (req, res) => {
    
    const userName = 'John Doe'
    res.render('index', {userName})

})


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})