import mongoose from 'mongoose'
import logger from '../utils/logger'

export const databaseConnection = async () => {
    try {
        const databaseUri = process.env.MONGODB_URI

        if (!databaseUri) {
            throw new Error('Database Uri is not defined')
        }

        await mongoose.connect(databaseUri)
        logger.info('Connected to MongoDB')
    } catch (err) {
        logger.error(`Could not connect to DB: ${err}`)
        process.exit(1)
    }
}
