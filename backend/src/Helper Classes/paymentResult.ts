import { Typegoose, prop } from 'typegoose'

export class PaymentResult extends Typegoose {
  @prop({})
  id?: string
  @prop({})
  status?: string
  @prop({})
  update_time?: string
  @prop({})
  email_address?: string
}
