import React, { useState, useEffect } from 'react'
import Product from '../Product'
import axios from 'axios'
import { Row, Col } from 'react-bootstrap'
const HomeScreen = () => {
  const [products, setProducts] = useState([])
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products')
      setProducts(data)
    }
    fetchProducts()
  }, [])
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map(product => (
          <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
            <Product key={product._id} product={product} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default HomeScreen
