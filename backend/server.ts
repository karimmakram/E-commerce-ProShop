import express from 'express'
import products from './data/products'
import cors from 'cors'
const app = express()
app.use(cors())
app.get('/', (req, res) => {
  res.send('App Running')
})
app.get('/api/products', (req, res) => {
  res.json(products)
})
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p._id === req.params.id)
  if (product) return res.json(product)
  res.status(400).send('product not found')
})
app.listen(5000, () => {
  console.log('app Running')
})
