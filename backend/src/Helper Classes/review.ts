import { Typegoose, prop, Ref } from 'typegoose'
import { User } from '../users/user.model'

export class Review extends Typegoose {
  @prop({ ref: User, required: true })
  user?: Ref<User>
  @prop({ required: true })
  name?: string
  @prop({ required: true, default: 5 })
  rating?: number
  @prop({ required: true })
  comment?: string
}
export const reviewModel = new Review().getModelForClass(Review)
