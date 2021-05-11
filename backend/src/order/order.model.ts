import { Typegoose, prop, Ref } from 'typegoose'
import { User } from '../users/user.model'
import { OrderItem } from '../Helper Classes/orderItem'
import { Address } from '../Helper Classes/address'
import { PaymentResult } from '../Helper Classes/paymentResult'

export class Order extends Typegoose {
  @prop({ ref: User, required: true })
  user?: Ref<User>
  @prop({})
  orderItems?: [OrderItem]
  @prop({ default: {} })
  shippingAddress?: Address
  @prop({})
  paymentMethod?: string
  @prop()
  paymentResult?: PaymentResult
  @prop({ required: true, default: 0.0 })
  taxPrice?: number
  @prop({ required: true, default: 0.0 })
  shippingPrice?: number
  @prop({ required: true, default: 0.0 })
  itemsPrice?: number
  @prop({ required: true, default: 0.0 })
  totalPrice?: number
  @prop({ required: true, default: false })
  isPaid?: boolean
  @prop({})
  paidAt?: Date
  @prop({ required: true, default: false })
  isDelivered?: boolean
  @prop({})
  deliveredAt?: Date
}
const orderModel = new Order().getModelForClass(Order)
export default orderModel
