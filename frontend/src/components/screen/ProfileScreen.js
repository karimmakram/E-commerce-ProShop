import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Col, Row, Button, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../Message'
import Loader from '../Loader'
import { updateProfile } from '../../redux/actions/userAction'
import { getMyOrderList } from '../../redux/actions/orderAction'
const ProfileScreen = ({ history }) => {
  const { userInfo, loading, error, success } = useSelector(state => state.user)
  const { loading: ordersLoading, orders, error: errorOrders } = useSelector(
    state => state.myOrderList
  )
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [email, setemail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      setName(userInfo.name)
      setemail(userInfo.email)
      dispatch(getMyOrderList())
    }
  }, [dispatch, history, userInfo, success])
  const submitForm = e => {
    setMessage(null)
    e.preventDefault()
    if (password === confirmPassword) {
      dispatch(updateProfile({ name, email, password }, userInfo.token))
    } else setMessage('please confirm Password')
  }
  return (
    <Row>
      <Col md={3}>
        <h2>Profile </h2>
        {error && <Message variant='danger'>{error}</Message>}
        {message && <Message variant='danger'>{message}</Message>}
        {success && (
          <Message variant='success'>Update Profile Successful</Message>
        )}
        {loading && <Loader />}
        <Form onSubmit={submitForm}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Name'
              value={name}
              onChange={e => {
                setName(e.target.value)
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter Email'
              value={email}
              onChange={e => {
                setemail(e.target.value)
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter Password'
              value={password}
              onChange={e => {
                setPassword(e.target.value)
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={e => {
                setConfirmPassword(e.target.value)
              }}
            ></Form.Control>
          </Form.Group>
          <Button type='submit' varient='primary'>
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {ordersLoading ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant='danger'>{errorOrders}</Message>
        ) : orders.length === 0 ? (
          <Message>you don't have any orders</Message>
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Id</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Delivered</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/orders/${order._id}`}>
                      <Button className='btn-sm' type='button' variant='light'>
                        Details
                      </Button>
                    </LinkContainer>{' '}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
}

export default ProfileScreen
