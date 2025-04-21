import express, { Router } from 'express'
import router from './route.js';
import { storage } from './config/multer.js';

// Define a simple route
app.get('/', (req, res) => {
    
    res.send('Hello Express')

})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})