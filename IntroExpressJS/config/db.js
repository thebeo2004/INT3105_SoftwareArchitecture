import mongoose from "mongoose";

export const connectDB = async () => {
    
    const MONGODB_URI = 'mongodb+srv://thenhuet2004:18112004@cluster0.8qqhvjn.mongodb.net/express'

    await mongoose.connect(MONGODB_URI).then(() => {
    console.log('Database Connected')
})
}