import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Row, Card, Image, Button, ListGroup } from 'react-bootstrap'
import products from '../../products'
import Rating from '../Rating'
const ProductScreen = props => {
  const product = products.find(
    product => product._id === props.match.params.id
  )
  return (
    <>
      <Link to='/' className='btn  my-3' style={{ paddingLeft: 0 }}>
        Go Back
      </Link>
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
    </>
  )
}

export default ProductScreen
