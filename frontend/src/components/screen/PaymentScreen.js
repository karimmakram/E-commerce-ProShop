import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../FormContiner'
import { savePaymentMethod } from '../../redux/actions/cartActions'
import CheckoutSteps from '../CheckoutSteps'
const ShippingScreen = ({ history }) => {
  const { shippingAddress } = useSelector(state => state.cart)
  if (!shippingAddress) {
    history.push('/shipping')
  }
  const [paymentMethod, setPaymentMethod] = useState('PayPal')
  const dispatch = useDispatch()

  const submitHandler = e => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              value='PayPal'
              id='PayPal'
              name='paymentMethod'
              label='PayPal or Credit Card'
              onChange={e => setPaymentMethod(e.target.value)}
              checked
            ></Form.Check>
            <Form.Check
              type='radio'
              value='Cash'
              id='Cash'
              name='paymentMethod'
              label='Cash'
              onChange={e => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type='submit' variant='primary' autoCapitalize={false}>
          Next
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen
