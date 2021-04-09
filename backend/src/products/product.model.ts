import { Typegoose, prop, Ref } from 'typegoose'
import { User } from '../users/user.model'
import { Review } from '../Helper Classes/review'
export class Product extends Typegoose {
  @prop({ ref: User, required: true })
  user?: Ref<User>
  @prop({ required: true })
  name?: string
  @prop({ required: true, unique: true })
  image?: string
  @prop({ required: true })
  brand?: string
  @prop({ required: true })
  category?: string
  @prop({ required: true })
  description?: string
  @prop({ required: true, default: 0 })
  rating?: number
  @prop({ required: true, default: 0 })
  numReviews?: number
  @prop({ required: true, default: 0 })
  price?: number
  @prop({ required: true, default: 0 })
  countInStock?: number
  @prop({ default: [] })
  reviews?: [Review]
}
const productModel = new Product().getModelForClass(Product)
export default productModel
