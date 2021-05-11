import { Router } from 'express'
import orderController from './order.controller'
const orderRoute = Router()
import asyncHandler from 'express-async-handler'
import Auth from '../../middlewere/auth'

///@desc add order item
///@route /api/orders
///@access private
orderRoute
  .route('/')
  .post(asyncHandler(Auth), asyncHandler(orderController.addOrder))

///@desc add order item
///@route /api/orders
///@access private
orderRoute
  .route('/:id')
  .get(asyncHandler(Auth), asyncHandler(orderController.getOrder))

export default orderRoute
