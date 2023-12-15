import * as dotenv from 'dotenv'

dotenv.config()

export const API_VERSION = '/api/v01'
export const NODE_ENV = process.env.NODE
export const PORT = process.env.PORT
export const MONGODB_URI = process.env.MONGODB_URI as string
