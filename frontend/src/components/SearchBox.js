import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')
  const submitHandler = e => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
      //   setKeyword('')
    } else {
      history.push('/')
    }
  }
  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type='text'
        className='mr-sm-2 ml-sm-5'
        name='q'
        onChange={e => setKeyword(e.target.value)}
        placeholder='Search Products...'
        value={keyword}
      ></Form.Control>
      <Button type='submit' variant='outline-success' className='p-2'>
        Search
      </Button>
    </Form>
  )
}

export default SearchBox
