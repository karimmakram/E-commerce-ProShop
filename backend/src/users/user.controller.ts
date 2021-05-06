import { Request, Response } from 'express'
import userModel from './user.model'
import bcrypt from 'bcryptjs'
class userController {
  registerUser = async (req: Request, res: Response) => {
    const {
      name,
      email,
      password
    }: { name: string; email: string; password: string } = req.body
    const { isAdmin }: { isAdmin: boolean } = req.body || false
    const user = await userModel.findOne({ email })
    if (user) {
      throw new Error('user already exists')
    }
    try {
      const newUser = new userModel({
        name,
        email,
        password,
        isAdmin
      })
      await newUser.save()
      return res
        .status(200)
        .json({ user: newUser, token: newUser.generateToken() })
    } catch (error) {
      throw new Error(error.message)
    }
  }

  Login = async (req: Request, res: Response) => {
    const { email, password }: { email: string; password: string } = req.body
    const user = await userModel.findOne({ email })
    if (user && user.comparePassword(password)) {
      return res.send({
        _id: user.id,
        name: user.name,
        isAdmin: user.isAdmin,
        token: user.generateToken()
      })
    }
    throw new Error('invalid lodin')
  }

  userProfile = async (req: Request, res: Response) => {
    res.status(200).json({ user: req.user })
  }
}

export default new userController()
