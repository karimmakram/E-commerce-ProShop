import { Typegoose, prop, instanceMethod, InstanceType, pre } from 'typegoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

@pre<User>('save', async function(next) {
  if (!this.isModified('password')) {
    next()
  }
  this.password = await bcrypt.hash(this.password + '', 8)
})
export class User extends Typegoose {
  @prop({ required: true })
  name?: string
  @prop({ required: true, unique: true })
  email?: string
  @prop({ required: true, minlength: 6 })
  password?: string
  @prop({ default: false })
  isAdmin?: boolean

  @instanceMethod
  async comparePassword(this: InstanceType<User>, password: string) {
    return await bcrypt.compare(password, `${this.password}`)
  }

  @instanceMethod
  generateToken(this: InstanceType<User>) {
    return jwt.sign({ _id: this._id }, process.env.SECRET_KEY + '', {
      expiresIn: '7d'
    })
  }
}

const userModel = new User().getModelForClass(User)
export default userModel
