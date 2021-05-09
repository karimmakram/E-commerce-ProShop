import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { register } from '../../redux/actions/userAction'
import { Form, Col, Row, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../FormContiner'
import Message from '../Message'
import Loader from '../Loader'
const RegisterScreen = ({ location, history }) => {
  const redirect = location.search ? location.search.split('=')[1] : '/'
  const { userInfo, loading, error } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [email, setemail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])
  const submitForm = e => {
    setMessage('')
    e.preventDefault()
    if (password === confirmPassword) dispatch(register(name, email, password))
    else setMessage('please confirm Password')
  }
  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {message && <Message variant='danger'>{message}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitForm}>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Name'
            value={name}
            required
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
        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            required
            onChange={e => {
              setConfirmPassword(e.target.value)
            }}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' varient='primary'>
          Sign Up
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          Have an Account ?{' '}
          <Link to={redirect ? `/login/redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen
