import dotenv from 'dotenv'
import mongoose from 'mongoose'
import express from 'express'
import logger from './logger.ts'
import cors from 'cors'
import { players, users, managers, matches, fields } from './routes/index.ts'


dotenv.config()


const { MONGODB_URL, PORT } = process.env


mongoose.connect(MONGODB_URL)
    .then(() => {
        const api = express()

        api.use(cors())

        api.use('/players', players)
        api.use('/managers', managers)
        api.use('/users', users)
        api.use('/matches', matches)
        api.use('/fields', fields)


        api.listen(PORT, () => logger.info(`API listening on port ${PORT}`))
    })
    .catch(error => logger.error(error))