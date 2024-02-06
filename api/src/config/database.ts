import mongoose from 'mongoose'

export const databaseConnection = async () => {
    try {
        const databaseUri = process.env.MONGODB_URI

        if (!databaseUri) {
            throw new Error('Database Uri is not defined')
        }

        await mongoose.connect(databaseUri)
        console.log('Connected to MongoDB')
    } catch (err) {
        console.error(`Could not connect to DB: ${err}`)
        process.exit(1)
    }
}
