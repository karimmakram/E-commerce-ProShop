import Modal from 'react-bootstrap/Modal'
import React, { useState } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import Loader from '../Loader'
import Message from '../Message'
const ModelFrom = ({ show, setshow, onSubmit, product, loading, error }) => {
  const [name, setname] = useState(product ? product.name : '')
  const [brand, setbrand] = useState(product ? product.brand : '')
  const [category, setcategory] = useState(product ? product.category : '')
  const [price, setprice] = useState(product ? product.price : '')
  const [countInStock, setcountInStock] = useState(
    product ? product.countInStock : ''
  )
  const [image, setimage] = useState(product ? product.image : '')
  const [description, setdescription] = useState(
    product ? product.description : ''
  )
  return (
    <>
      <Modal
        show={show}
        onHide={() => setshow(false)}
        dialogClassName='modal-90w'
        aria-labelledby='example-custom-modal-styling-title'
      >
        <Modal.Header closeButton>
          <Modal.Title id='example-custom-modal-styling-title'>
            Create Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading && <Loader />}
          {error && <Message variant='danger'>{error}</Message>}
          <Form
            onSubmit={
              product
                ? product._id &&
                  (e => {
                    onSubmit(e, product._id, {
                      name,
                      image,
                      category,
                      brand,
                      price,
                      countInStock,
                      description
                    })
                  })
                : onSubmit
            }
          >
            <Form.Group controlId='name' className='mb-3'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                required
                value={name}
                onChange={e => {
                  console.log(e.target.value)
                  setname(e.target.value)
                }}
              />
            </Form.Group>
            <Row className='mb-3'>
              <Form.Group as={Col} controlId='category' className='mb-3'>
                <Form.Label>Category </Form.Label>
                <Form.Control
                  type='text'
                  required
                  size='sm'
                  value={category}
                  onChange={e => {
                    console.log(e.target.value)
                    setcategory(e.target.value)
                  }}
                />
              </Form.Group>

              <Form.Group as={Col} controlId='brand' className='mb-3'>
                <Form.Label>Brand </Form.Label>
                <Form.Control
                  type='text'
                  required
                  size='sm'
                  value={brand}
                  onChange={e => {
                    console.log(e.target.value)
                    setbrand(e.target.value)
                  }}
                />
              </Form.Group>
            </Row>

            <Row>
              <Form.Group as={Col} controlId='price' className='mb-3'>
                <Form.Label>Price </Form.Label>
                <Form.Control
                  type='number'
                  min={0}
                  required
                  size='sm'
                  value={price}
                  onChange={e => {
                    console.log(e.target.value)
                    setprice(e.target.value)
                  }}
                />
              </Form.Group>
              <Form.Group as={Col} className='mb-3' controlId='countInStock'>
                <Form.Label>Count In Stock</Form.Label>
                <Form.Control
                  type='number'
                  min='0'
                  required
                  size='sm'
                  value={countInStock}
                  onChange={e => {
                    console.log(e.target.value)
                    setcountInStock(e.target.value)
                  }}
                />
              </Form.Group>
            </Row>

            <Form.Group controlId='image' className='mb-3'>
              <Form.Label>choose image </Form.Label>
              <Form.Control
                type='text'
                size='sm'
                required
                value={image}
                onChange={e => {
                  setimage(e.target.value)
                }}
                readOnly={product ? product._id && true : false}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as='textarea'
                value={description}
                onChange={e => {
                  console.log(e.target.value)
                  setdescription(e.target.value)
                }}
              />
            </Form.Group>
            <Row className='align-items-center'>
              <Col className='text-left'>
                <Button variant='primary' type='submit'>
                  {product ? 'update product' : 'create Product'}
                </Button>
              </Col>
              <Col className='text-right'>
                <Button
                  className='my-3'
                  variant='danger'
                  onClick={() => setshow(false)}
                >
                  cancle
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ModelFrom
