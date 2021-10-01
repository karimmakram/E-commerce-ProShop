import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { userLogin } from '../../redux/actions/userAction'
import { Form, Col, Row, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../FormContiner'
import Message from '../Message'
import Loader from '../Loader'
const LoginScreen = ({ location, history }) => {
  const redirect = location.search ? location.search.split('=')[1] : '/'
  const { userInfo, loading, error } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [email, setemail] = useState('')
  const [password, setPassword] = useState('')
  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])
  const submitForm = e => {
    e.preventDefault()
    dispatch(userLogin(email, password))
  }
  return (
    <FormContainer>
      <h1>Sign in</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitForm}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter Email'
            value={email}
            required
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
            required
            onChange={e => {
              setPassword(e.target.value)
            }}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' varient='primary'>
          Sign In
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          new Customer ?{' '}
          <Link to={redirect ? `/register/redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen
