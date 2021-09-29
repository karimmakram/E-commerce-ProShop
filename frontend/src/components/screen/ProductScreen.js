import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Col, Row, Card, Image, Button, ListGroup, Form } from 'react-bootstrap'
import Rating from '../Rating'
import Loader from '../Loader'
import Message from '../Message'
import {
  getProductById,
  createReviewProduct
} from '../../redux/actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../../redux/types'
import Meta from '../Meta'
const ProductScreen = ({ match, history }) => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productState)
  const { product, loading, error } = productList
  const { userInfo } = useSelector(state => state.user)
  const productReview = useSelector(state => state.productReview)
  const { success, error: errorReview } = productReview
  useEffect(() => {
    if (success) {
      alert('Review submited')
      setRating(0)
      setComment('')
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
    dispatch(getProductById(match.params.id))
  }, [dispatch, match, success])

  const submitHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }
  const submitReview = e => {
    e.preventDefault()
    dispatch(
      createReviewProduct(match.params.id, {
        rating,
        comment,
        user: userInfo._id,
        name: userInfo.name
      })
    )
  }
  return (
    <>
      <Meta title={product.name} />
      <Link to='/' className='btn  my-3' style={{ paddingLeft: 0 }}>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant={'danger'} text={error} />
      ) : (
        <>
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
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={e => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(x => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Row>
                      <Button
                        onClick={submitHandler}
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
          <Row className='mt-3'>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews && product.reviews.length === 0 && (
                <Message>NO Reviews</Message>
              )}
              <ListGroup>
                {product.reviews &&
                  product.reviews.map(review => (
                    <ListGroup.Item key={review.user}>
                      <h4>{review.name}</h4>
                      <Rating value={review.rating} />
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                <ListGroup.Item>
                  <h2>Write a Review</h2>
                  {errorReview && (
                    <Message variant='danger'>{errorReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitReview}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={e => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Execellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={e => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group>
                        <Button
                          className='btn-block'
                          type='submit'
                          variant='primary'
                        >
                          Review
                        </Button>
                      </Form.Group>
                    </Form>
                  ) : (
                    <Message>
                      please <Link to='/login'>Login</Link> to write Review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ProductScreen
