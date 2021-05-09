import React, { useState, useEffect } from 'react'
import { Form, Col, Row, Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../Message'
import Loader from '../Loader'
import { updateProfile } from '../../redux/actions/userAction'
const ProfileScreen = ({ history }) => {
  const { userInfo, loading, error, success } = useSelector(state => state.user)
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
    }
  }, [history, userInfo, success])
  const submitForm = e => {
    setMessage(null)
    e.preventDefault()
    if (password === confirmPassword) {
      dispatch(updateProfile({ name, email, password }, userInfo.token))
    } else setMessage('please confirm Password')
  }
  return (
    <Row>
      <Col md={4}>
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
      <Col md={8}>
        <h2>My Orders</h2>
        <h4>you don't order anything till Now</h4>
      </Col>
    </Row>
  )
}

export default ProfileScreen
