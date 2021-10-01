import { Typegoose, prop, Ref } from 'typegoose'
import { Product } from '../products/product.model'

export class OrderItem extends Typegoose {
  @prop({ required: true })
  name?: string
  @prop({ required: true })
  qty?: number
  @prop({ required: true })
  price?: number
  @prop({ required: true })
  image?: string
  @prop({ required: true, ref: Product })
  product?: Ref<Product>
}
export const orderItemModer = new OrderItem().getModelForClass(OrderItem)
