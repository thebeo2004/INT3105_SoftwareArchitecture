import express, { Router } from 'express'

const app = express()
const PORT = 3000

// Define middleware
app.use(express.json())

// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello Express')
})

process.on("uncaughtException", (err) => {
    console.log(err)
    process.exit(1)
})

process.on('unhandledRejection', (reason, promise) => {
    console.log(reason);
    
})

// Synchronous Error
app.get('/synchronous', (req, res, next) => {
    try {
        throw new Error('Something went wrong!')
    } catch (error) {
        next(error)
    }

})

// Asynchronous 
app.get('/asynchronous', async (req, res, next) => {
    try {
        await Promise.reject(new Error('Async error occured'))
    } catch (error) {
        next(error)
    }
})

app.use((err, req, res, next) => {
    console.error(err.message)
    console.log(err.stack)
    res.status(500).json({message:err.message})
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})