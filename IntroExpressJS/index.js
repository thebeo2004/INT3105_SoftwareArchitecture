import express, { Router } from 'express'
import cookieParser from 'cookie-parser'
import session from 'express-session'

const app = express()
const PORT = 3000

app.use(cookieParser())
app.use(session({
    secret: 'sample-secret',
    resave: false,
    saveUninitialized:false
}))


// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello Express')
})



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})