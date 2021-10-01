import { Router } from 'express'
import productCn from './product.controller'
import asyncHandler from 'express-async-handler'
import Auth, { Admin } from '../../middlewere/auth'
const productRoute = Router()

// @Desc    get all products
// @route   GET /api/products
// @access  public
productRoute.get('/', asyncHandler(productCn.getAllProducts))

// get 3 top product
// public
productRoute.get('/top', asyncHandler(productCn.getTopProduct))

// @Desc    get one product by id
// @route   GET /api/products/:id
// @access  public
productRoute.get('/:id', asyncHandler(productCn.getProductById))

// @Desc    delete one product by id
// @route   GET /api/product/:id
// @access  private
productRoute.delete(
  '/:id',
  asyncHandler(Auth),
  asyncHandler(Admin),
  asyncHandler(productCn.deleteProduct)
)

productRoute.post(
  '/',
  asyncHandler(Auth),
  asyncHandler(Admin),
  asyncHandler(productCn.createProduct)
)

productRoute.patch(
  '/:id',
  asyncHandler(Auth),
  asyncHandler(Admin),
  asyncHandler(productCn.updateProduct)
)

productRoute.post(
  '/:id/reviews',
  asyncHandler(Auth),
  asyncHandler(productCn.addReview)
)

export default productRoute
