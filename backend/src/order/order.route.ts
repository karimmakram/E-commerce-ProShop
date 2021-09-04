import { Router } from 'express'
import orderController from './order.controller'
const orderRoute = Router()
import asyncHandler from 'express-async-handler'
import Auth, { Admin } from '../../middlewere/auth'

///@desc    add order
///@route   POST /api/orders
///@access  private
orderRoute
  .route('/')
  .post(asyncHandler(Auth), asyncHandler(orderController.addOrder))

///@desc    get orders
///@route   get /api/orders
///@access  private , ADMIN
orderRoute
  .route('/')
  .get(
    asyncHandler(Auth),
    asyncHandler(Admin),
    asyncHandler(orderController.getOrders)
  )

///@desc    get user orders
///@route   GET  /api/orders
///@access  private
orderRoute
  .route('/me')
  .get(asyncHandler(Auth), asyncHandler(orderController.getUserOrders))

///@desc     get order by ID
///@route    GET /api/orders/:id
///@access   private
orderRoute
  .route('/:id')
  .get(asyncHandler(Auth), asyncHandler(orderController.getOrder))

///@desc   paid order with paypal
///@route  PUT /api/orders/orderId/pay
///@access private
orderRoute
  .route('/:id/pay')
  .put(asyncHandler(Auth), asyncHandler(orderController.paidOrder))

export default orderRoute
