import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../FormContiner'
import Message from '../Message'
import Loader from '../Loader'
import { getUserDetils, updateUser } from '../../redux/actions/userAction'
import { USER_UPDATE_RESET } from '../../redux/types'
const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id
  const { userInfo } = useSelector(state => state.user)
  const { user, loading, error } = useSelector(state => state.userDetils)
  const { error: errorUpdate, success, loading: loadingUpdate } = useSelector(
    state => state.userUpdate
  )
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [email, setemail] = useState('')
  const [message, setMessage] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      return history.push('/')
    }
    if (!user || user._id !== userId) {
      dispatch(getUserDetils(userId, userInfo.token))
    } else {
      setName(user.name)
      setemail(user.email)
      setIsAdmin(user.isAdmin)
    }
  }, [history, userInfo, user, dispatch, userId, success])
  const submitForm = e => {
    e.preventDefault()
    if (email === user.email && name === user.name && isAdmin === user.isAdmin)
      setMessage('you must change information to updated')
    else
      dispatch(
        updateUser(
          {
            _id: user._id,
            name,
            email,
            isAdmin
          },
          userInfo.token
        )
      )
    setTimeout(() => {
      dispatch({ type: USER_UPDATE_RESET })
      setMessage(null)
    }, 5000)
  }
  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loading ? (
          <Loader />
        ) : loadingUpdate ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
            {message && <Message variant='danger'>{message}</Message>}
            {errorUpdate ? (
              <Message variant='danger'>{errorUpdate}</Message>
            ) : (
              success && <Message variant='success'>user Updated</Message>
            )}
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

              <Form.Group controlId='isAdmin'>
                <Form.Check
                  type='checkbox'
                  label='Is Admin'
                  checked={isAdmin}
                  onChange={e => {
                    setIsAdmin(e.target.checked)
                  }}
                ></Form.Check>
              </Form.Group>

              <Button type='submit' varient='primary'>
                Update
              </Button>
            </Form>
          </>
        )}
      </FormContainer>
    </>
  )
}
export default UserEditScreen
