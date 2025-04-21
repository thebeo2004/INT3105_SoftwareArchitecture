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

app.use(express.json())

// Upload data
app.post('/person', async (req, res) => {
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

// Update data
app.put('/person', async (req, res) => {
    const {email} = req.body

    const personData = await Person.find({
        email
    })

    console.log(personData)
    res.send('Update data successfully')
})

// Deleting Data from MongoDb
app.delete('/person/:id', async (req, res) => {
    const {id} = req.params
    await Person.findByIdAndDelete(id)
    res.send("Deleted object successfully")
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})