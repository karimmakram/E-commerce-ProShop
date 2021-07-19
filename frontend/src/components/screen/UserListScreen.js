import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { userList, deleteUser } from '../../redux/actions/userAction'
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../Message'
import Loader from '../Loader'
const UserListScreen = ({ history }) => {
  const dispatch = useDispatch()
  const user_list = useSelector(state => state.userList)
  const { userInfo } = useSelector(state => state.user)
  const { success } = useSelector(state => state.userDelete)
  const { loading, error, users } = user_list
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) dispatch(userList(userInfo.token))
    else history.push('/')
  }, [dispatch, history, success])

  const deleteUserHandler = _id => {
    if (window.confirm('Are you sure ?'))
      dispatch(deleteUser(_id, userInfo.token))
  }
  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => {
              return (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <i
                        className='fas fa-check'
                        style={{ color: 'green' }}
                      ></i>
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/user/${user._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => {
                        deleteUserHandler(user._id)
                      }}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default UserListScreen
