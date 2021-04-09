import { Typegoose, prop, Ref } from 'typegoose'

export class Review extends Typegoose {
  @prop({ required: true })
  name?: string
  @prop({ required: true })
  rating?: number
  @prop({ required: true })
  comment?: string
}
export const reviewModel = new Review().getModelForClass(Review)
