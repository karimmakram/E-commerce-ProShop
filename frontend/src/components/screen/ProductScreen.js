import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Col, Row, Card, Image, Button, ListGroup } from 'react-bootstrap'
import Rating from '../Rating'
import Loader from '../Loader'
import Message from '../Message'
import { getProductById } from '../../redux/actions/productActions'
const ProductScreen = ({ match }) => {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productState)
  const { product, loading, error } = productList
  useEffect(() => {
    dispatch(getProductById(match.params.id))
  }, [dispatch, match])

  return (
    <>
      <Link to='/' className='btn  my-3' style={{ paddingLeft: 0 }}>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant={'danger'} text={error} />
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              {/* <ListGroup.Item>Price: ${product.price}</ListGroup.Item> */}
              <ListGroup.Item>{product.description}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>${product.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    {product.countInStock > 0 ? (
                      <Col>In Stock</Col>
                    ) : (
                      <Col>Out of Stock</Col>
                    )}
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Brand:</Col>
                    <Col>{product.brand}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Category:</Col>
                    <Col>{product.category}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Button
                      className='btn-block'
                      type='button'
                      disabled={product.countInStock === 0}
                    >
                      Add to Cart
                    </Button>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  )
}

export default ProductScreen
