import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import userModel, { User } from '../src/users/user.model'
import { InstanceType } from 'typegoose'
declare global {
  namespace Express {
    export interface Request {
      user: InstanceType<User>
      token: string
    }
  }
}
const Auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')
  if (!token) throw new Error('authorization denied')
  const _id = jwt.verify(token, process.env.SECRET_KEY + '')
  const user = await userModel.findOne({ _id }).select('-password')
  if (!user) throw new Error(`user didn't exist`)
  try {
    req.user = user
    req.token = token
    next()
  } catch (error) {
    res.status(401)
    throw new Error(`tokne is not valid`)
  }
}
export default Auth
