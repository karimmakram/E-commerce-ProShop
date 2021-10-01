import React, { useEffect, useState } from 'react'
// import { LinkContainer } from 'react-router-bootstrap'
import {
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct
} from '../../redux/actions/productActions'
import { Button, Table, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../Message'
import Loader from '../Loader'
import ModelFrom from './ModelFrom'
import { PRODUCT_CREATE_RESET } from '../../redux/types'
import Paginate from '../Paginate'

const ProductScreen = ({ history, match }) => {
  const dispatch = useDispatch()
  const pageNumber = match.params.pageNumber || 1
  const product_list = useSelector(state => state.productState)
  const { userInfo } = useSelector(state => state.user)
  const [show, setshow] = useState(false)
  const [edit, setEdit] = useState(false)
  const [product, setproduct] = useState({})
  const { success, error: errorDelete, loading: loadingDelete } = useSelector(
    state => state.productDelete
  )
  const {
    success: successCreate,
    loading: loadingCreate,
    error: errorCreate
  } = useSelector(state => state.productCreate)
  const { loading, error, products, page, pages } = product_list
  useEffect(() => {
    if (successCreate) {
      setshow(false)
      setEdit(false)
      dispatch({ type: PRODUCT_CREATE_RESET })
    }
    if (userInfo && userInfo.isAdmin) {
      if (!successCreate) dispatch(getProducts('', pageNumber))
    } else history.push('/')
  }, [dispatch, history, userInfo, success, successCreate, pageNumber])
  const createProductHandler = () => {
    setshow(true)
  }
  const deleteProductHandler = _id => {
    if (window.confirm('Are you sure ?'))
      dispatch(deleteProduct(_id, userInfo.token))
  }
  const onSubmitModel = e => {
    e.preventDefault(e)
    dispatch(
      createProduct({
        name: e.target.name.value,
        brand: e.target.brand.value,
        image: e.target.image.value,
        category: e.target.category.value,
        price: e.target.price.value,
        countInStock: e.target.countInStock.value,
        description: e.target.description.value
      })
    )
  }
  const onSubmitModelEdit = (e, id, product) => {
    e.preventDefault()
    dispatch(updateProduct(id, product))
  }
  return (
    <>
      {show && (
        <ModelFrom
          show={show}
          setshow={setshow}
          onSubmit={onSubmitModel}
          loading={loadingCreate}
          error={errorCreate}
        />
      )}
      {edit && (
        <ModelFrom
          show={edit}
          setshow={setEdit}
          onSubmit={onSubmitModelEdit}
          product={product}
          loading={loadingCreate}
          error={errorCreate}
        />
      )}
      <Row className='align-items-center'>
        <Col className='text-left'>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => {
                return (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td> ${product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                      <Button
                        variant='light'
                        className='btn-sm'
                        onClick={() => {
                          setEdit(true)
                          setproduct(product)
                        }}
                      >
                        <i className='fas fa-edit'></i>
                      </Button>
                      <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => deleteProductHandler(product._id)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={userInfo.isAdmin} />
        </>
      )}
    </>
  )
}

export default ProductScreen
