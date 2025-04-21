import express, { Router } from 'express'
import cookieParser from 'cookie-parser'

const app = express()
const PORT = 3000

app.use(cookieParser())


// Define a simple route
app.get('/', (req, res) => {
    
    // Adding cookie exipry ~ 6 minutes
    res.cookie('name', 'express-app', {maxAge: 360000})

    res.send('Hello Express')

})

app.get('/remove-cookie', (req, res) => {
    res.clearCookie('name')
    res.send('Cookie removed successfully')
})

app.get('/fetch', (req, res) => {
    console.log(req.cookies)
    res.send('API Called')
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})