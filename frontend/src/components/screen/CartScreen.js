import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItem, removeItem } from '../../redux/actions/cartActions'
import { Link } from 'react-router-dom'
import { Col, Row, Button, Card, Image, Form, ListGroup } from 'react-bootstrap'
import Message from '../Message'
const CartScreen = ({ match, location, history }) => {
  const dispatch = useDispatch()
  const productId = match.params.id
  const qty = location.search ? Number(location.search.split('=')[1]) : 1
  const cart = useSelector(state => state.cart)
  const { cartItems } = cart
  useEffect(() => {
    if (productId) dispatch(addItem(productId, qty))
  }, [dispatch, productId, qty])

  const handleChckout = () => {
    history.push(`/login?redirect=shipping`)
  }
  return (
    <Row>
      <Col md={8}>
        <h1>Shipping Card</h1>
        {cartItems.length === 0 ? (
          <Message>
            your Cart is Empty
            <Link to='/' style={{ textDecoration: 'none' }}>
              {' '}
              Go Back
            </Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map(item => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} rounded fluid />
                  </Col>
                  <Col md={3} style={{ margin: 'auto' }}>
                    <Link to={`/products/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2} style={{ margin: 'auto' }}>
                    ${item.price}
                  </Col>
                  <Col md={2} style={{ margin: 'auto' }}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={e =>
                        dispatch(addItem(item.product, Number(e.target.value)))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map(x => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2} style={{ margin: 'auto' }}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => dispatch(removeItem(item.product))}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>
                Subtotal (
                {Number(
                  cartItems.reduce((totalItem, item) => totalItem + item.qty, 0)
                )}
                ) items
              </h3>
              <h5>
                $
                {Number(
                  cartItems.reduce(
                    (totalPrice, item) => totalPrice + item.price * item.qty,
                    0
                  )
                ).toFixed(2)}
              </h5>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={handleChckout}
              >
                CheckOut
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen
