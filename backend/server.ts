import express from 'express'
import cors from 'cors'
import path from 'path'
import dotenv from 'dotenv'
import { connectDb } from './config/db'
import productRoute from './src/products/product.route'
import userRoute from './src/users/user.route'
import { errorHandler, notFound } from './middlewere/handleError'
import orderRoute from './src/order/order.route'
import uploadRoute from './middlewere/upload'
import morgan from 'morgan'
dotenv.config()
connectDb()
const app = express()
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use(cors())
app.use(express.json())
app.use('/api/products', productRoute)
app.use('/api/users', userRoute)
app.use('/api/orders', orderRoute)
app.use('/api/upload', uploadRoute)
app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID)
})
app.use('/uploads', express.static(path.join(path.resolve(), '/uploads')))

if (process.env.NODE_ENV == 'production') {
  app.use(express.static(path.join(path.resolve(), '/frontend/build')))
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'bulid', 'index.html'))
  )
} else {
  app.get('/', async (req, res) => {
    res.send('App Running')
  })
}

app.use(errorHandler)
app.use(notFound)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`app Running in port ${PORT}`)
})
