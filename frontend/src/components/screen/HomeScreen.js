import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../Product'
import { Row, Col } from 'react-bootstrap'
import { getProducts } from '../../redux/actions/productActions'
import Loader from '../Loader'
import Message from '../Message'
const HomeScreen = () => {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productState)
  const { products, loading, error } = productList
  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])
  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant={'danger'} text={error} />
      ) : (
        <Row>
          {products.map(product => (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Product key={product._id} product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default HomeScreen
