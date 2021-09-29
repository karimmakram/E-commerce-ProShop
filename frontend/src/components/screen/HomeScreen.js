import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../Product'
import { Row, Col } from 'react-bootstrap'
import { getProducts } from '../../redux/actions/productActions'
import Loader from '../Loader'
import Message from '../Message'
import Paginate from '../Paginate'
const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productState)
  const { products, loading, error, page, pages } = productList
  const userInfo = useSelector(state => state.user)
  useEffect(() => {
    dispatch(getProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])
  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant={'danger'} text={error} />
      ) : (
        <>
          <Row>
            {products.length === 0 && <Message>NO products to Show</Message>}
            {products.map(product => (
              <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                <Product key={product._id} product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            keyword={keyword ? keyword : ''}
            page={page}
            isAdmin={userInfo && userInfo.isAdmin}
          />
        </>
      )}
    </>
  )
}

export default HomeScreen
