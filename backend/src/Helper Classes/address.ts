import { Typegoose, prop } from 'typegoose'

export class Address extends Typegoose {
  @prop({ required: true })
  address?: string
  @prop({ required: true })
  city?: string
  @prop({ required: true })
  postalCode?: string
  // @prop({ required: true })
  // country?: string
}
export const addressModel = new Address().getModelForClass(Address)
