import { Request, Response } from 'express'
import orderModel, { Order } from './order.model'
import { Address, addressModel } from '../Helper Classes/address'
import { OrderItem, orderItemModer } from '../Helper Classes/orderItem'
class orderController {
  addOrder = async (req: Request, res: Response) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    }: {
      orderItems: [OrderItem]
      shippingAddress: Address
      paymentMethod: string
      itemsPrice: number
      taxPrice: number
      shippingPrice: number
      totalPrice: number
    } = req.body

    if (orderItems && orderItems.length <= 0) {
      throw new Error('No order Items')
    }
    try {
      const order = new orderModel({
        user: req.user._id,
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
      })
      await order.save()
      res.status(201).json(order)
    } catch (error) {
      throw new Error(error.message)
    }
  }
  getOrder = async (req: Request, res: Response) => {
    const id = req.params.id
    try {
      const order = await orderModel.findById(id).populate('user', 'name email')
      if (!order) {
        throw new Error('Order Not Found')
      }
      res.status(200).json(order)
    } catch (error) {
      if (error.kind == 'ObjectId') throw new Error('Order Not Found')
      throw new Error(error.message)
    }
  }
}

export default new orderController()
