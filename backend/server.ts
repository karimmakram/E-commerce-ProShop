import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDb } from './config/db'
import productRoute from './src/products/product.route'
import { errorHandler, notFound } from './middlewere/handleError'

dotenv.config()
connectDb()
const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/products', productRoute)
app.use(errorHandler)
app.use(notFound)
app.get('/', async (req, res) => {
  res.send('App Running')
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`app Running in port ${PORT}`)
})
