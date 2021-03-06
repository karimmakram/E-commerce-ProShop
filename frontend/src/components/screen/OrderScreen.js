import React, { useEffect, useState } from 'react'
import { Col, Row, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../Loader'
import Message from '../Message'
import {
  getOrderById,
  payOrder,
  deliverOrder
} from '../../redux/actions/orderAction'
// const PayPalButton = paypal.Buttons.driver('react', { React, ReactDOM })
import { PayPalButton } from 'react-paypal-button-v2'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../../redux/types'
const OrderScreen = ({ match, history }) => {
  const [sdkReady, setSdkReady] = useState(true)
  const [errorPayment, setErrorPayment] = useState(null)
  const orderId = match.params.id
  const dispatch = useDispatch()
  const { loading, error, order } = useSelector(state => state.orderDetails)
  const { userInfo } = useSelector(state => state.user)
  const {
    loading: loadingPay,
    error: payError,
    success: successPay
  } = useSelector(state => state.orderPay)
  const {
    loading: loadingDeliver,
    error: deliverError,
    success: successDeliver
  } = useSelector(state => state.orderDeliver)
  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
    // const addPaypalScript = async () => {
    //   const { data: clientId } = await axios.get('/api/config/paypal')
    //   const script = document.createElement('script')
    //   script.type = 'text/javascript'
    //   script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
    //   script.async = true
    //   script.onload = () => {
    //     setSdkReady(true)

    //     const PayPalButton = paypal.Buttons.driver('react', { React, ReactDOM })
    //   }

    //   document.body.appendChild(script)
    // }
    if (!order || successPay || orderId !== order._id || successDeliver) {
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch({ type: ORDER_PAY_RESET })
      dispatch(getOrderById(orderId))
    }
    // } else if (!order.isPaid) {
    //   if (!window.paypal) {
    //     addPaypalScript()
    //   } else {
    // const PayPalButton = paypal.Buttons.driver('react', { React, ReactDOM })
    //     setSdkReady(true)
    //   }
    // }
  }, [dispatch, orderId, successPay, userInfo, history, order, successDeliver])

  const successPaymentHandler = paymentResult => {
    console.log(paymentResult)
    dispatch(payOrder(orderId, { paymentResult }))
  }
  const errorPaymentHandler = error => {
    console.log(error)

    setErrorPayment('Error in Payment')
  }

  const deliverHandler = () => {
    dispatch(deliverOrder(order._id, userInfo.token))
  }
  return loading ? (
    <Loader />
  ) : error || payError ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      {order ? (
        <>
          <h1 className='ml-3'>Order {order._id}</h1>
          <Row>
            <Col md={8}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>Shipping</h2>
                  <p>
                    <strong>Name : {order.user.name}</strong>
                  </p>
                  <p>
                    <strong>Email :</strong>{' '}
                    <a href={`mailto:${order.user.email}`}>
                      {order.user.email}
                    </a>
                  </p>
                  <p>
                    <strong>Address: </strong>
                    {order.shippingAddress.address},{order.shippingAddress.city}
                    ,{order.shippingAddress.postalCode}
                  </p>
                  {order.isDelivered ? (
                    <Message variant='success'>
                      Deliverd on {order.deliveredAt}
                    </Message>
                  ) : (
                    <Message variant='danger'>Not Delivered</Message>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Payment Method</h2>
                  <p>
                    <strong>Method: </strong>
                    {order.paymentMethod}
                  </p>
                  {order.isPaid ? (
                    <Message variant='success'>Paid on {order.paidAt}</Message>
                  ) : (
                    <Message variant='danger'>Not Paid</Message>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Order Items</h2>
                  {order.orderItems.length === 0 ? (
                    <Message>Order is Empty</Message>
                  ) : (
                    <ListGroup>
                      {order.orderItems.map(item => (
                        <ListGroup.Item key={item.product}>
                          <Row>
                            <Col md={2}>
                              <Image
                                src={item.image}
                                alt={item.name}
                                fluid
                                rounded
                              />
                            </Col>
                            <Col>
                              <Link to={`/product/${item.product}`}>
                                {item.name}
                              </Link>
                            </Col>
                            <Col md={4}>
                              {item.qty} x {item.price} = $
                              {(item.qty * item.price).toFixed(2)}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h2>Order Summary</h2>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Items</Col>
                      <Col>${order.itemsPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>${order.shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>${order.taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Total</Col>
                      <Col>${order.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  {order.user._id === userInfo._id
                    ? !order.isPaid && (
                        <ListGroup.Item>
                          {loadingPay && <Loader />}
                          {!sdkReady ? (
                            <Loader />
                          ) : (
                            <PayPalButton
                              amount='0.01'
                              onSuccess={successPaymentHandler}
                              catchError={errorPaymentHandler}
                            />
                          )}
                        </ListGroup.Item>
                      )
                    : null}

                  {loadingDeliver && <Loader />}
                  {userInfo &&
                    userInfo.isAdmin &&
                    !order.isDelivered &&
                    order.isPaid && (
                      <ListGroup.Item>
                        <Button className='btn-block' onClick={deliverHandler}>
                          Deliverd
                        </Button>
                      </ListGroup.Item>
                    )}

                  {errorPayment && (
                    <ListGroup.Item>
                      <Message variant='danger'>{errorPayment}</Message>
                    </ListGroup.Item>
                  )}
                  {error && (
                    <ListGroup.Item>
                      <Message variant='danger'>{error}</Message>
                    </ListGroup.Item>
                  )}
                  {deliverError && (
                    <ListGroup.Item>
                      <Message variant='danger'>{deliverError}</Message>
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      ) : (
        <h1>no order</h1>
      )}
    </>
  )
}

export default OrderScreen
