import { Router } from 'express'
import productCn from './product.controller'
import asyncHandler from 'express-async-handler'
const productRoute = Router()

// @Desc    get all products
// @route   GET /api/product
// @access  public
productRoute.get('/', asyncHandler(productCn.getAllProducts))

// @Desc    get one product by id
// @route   GET /api/product/:id
// @access  public
productRoute.get('/:id', asyncHandler(productCn.getProductById))
export default productRoute
