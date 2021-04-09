import { Typegoose, prop } from 'typegoose'
export class User extends Typegoose {
  @prop({ required: true })
  name?: string
  @prop({ required: true, unique: true })
  email?: string
  @prop({ required: true, minlength: 6 })
  password?: string
  @prop({ default: false })
  isAdmin?: boolean
}

const userModel = new User().getModelForClass(User)
export default userModel
