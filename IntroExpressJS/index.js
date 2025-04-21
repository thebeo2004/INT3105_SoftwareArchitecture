import express, { Router } from 'express'
import { connectDB } from './config/db.js'
import { Person } from './models/Person.js'

const app = express()
const PORT = 3000

await connectDB()

// Define a simple route
app.get('/', (req, res) => {
    
    res.send('Hello Express')

})

app.post('/person',express.json(), async (req, res) => {
    const {email, name, age} = req.body
    const newPerson = new Person({
        name,
        age, 
        email
    })
    await newPerson.save()
    console.log(newPerson)
    res.send("Person added");
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})