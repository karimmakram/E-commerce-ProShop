import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../FormContiner'
import { saveShippingAddress } from '../../redux/actions/cartActions'
import CheckoutSteps from '../CheckoutSteps'
const ShippingScreen = ({ history }) => {
  const { shippingAddress } = useSelector(state => state.cart)
  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const dispatch = useDispatch()

  const submitHandler = e => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode }))
    history.push('/payment')
  }
  return (
    <FormContainer>
      <CheckoutSteps step1 step2={true} />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            value={address}
            required
            onChange={e => setAddress(e.target.value)}
            placeholder='Enter Address'
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            value={city}
            required
            onChange={e => setCity(e.target.value)}
            placeholder='Enter City'
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='postal-code'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type='text'
            value={postalCode}
            required
            onChange={e => setPostalCode(e.target.value)}
            placeholder='Enter Address'
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary' autoCapitalize={false}>
          Next
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen
