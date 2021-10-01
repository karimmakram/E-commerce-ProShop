import { Request, Response } from 'express'
import userModel from './user.model'
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
      return res.status(200).json({
        _id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        token: newUser.generateToken()
      })
    } catch (error) {
      throw new Error(error.message)
    }
  }

  Login = async (req: Request, res: Response) => {
    const { email, password }: { email: string; password: string } = req.body
    const user = await userModel.findOne({ email })
    if (user && (await user.comparePassword(password))) {
      return res.send({
        _id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: user.generateToken()
      })
    }
    throw new Error('invalid lodin')
  }

  userProfile = async (req: Request, res: Response) => {
    res.status(200).json({
      _id: req.user._id,
      email: req.user.email,
      name: req.user.name,
      isAdmin: req.user.isAdmin
    })
  }
  updateProfile = async (req: Request, res: Response) => {
    const user = await userModel.findById(req.user._id)
    try {
      if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password) user.password = req.body.password
        const updatedUser = await user.save()
        res.status(200).json({
          _id: updatedUser._id,
          email: updatedUser.email,
          name: updatedUser.name,
          isAdmin: updatedUser.isAdmin
        })
      } else {
        throw new Error('user Not Found')
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }

  getAllUsers = async (req: Request, res: Response) => {
    const users = await userModel.find({}).select('-password')
    res.json(users)
  }

  deleteUserById = async (req: Request, res: Response) => {
    const id: string = req.params.id
    try {
      const user = await userModel.findByIdAndDelete(id)
      if (user) return res.status(200).json({ message: 'user removed' })
      throw new Error(`user not Found`)
    } catch (error) {
      throw new Error(error.message)
    }
  }

  getUserById = async (req: Request, res: Response) => {
    const id: string = req.params.id
    try {
      const user = await userModel.findById(id).select('-password')
      if (user) return res.status(200).json(user)
      res.status(404)
      throw new Error(`user not Found`)
    } catch (error) {
      throw new Error(error.message)
    }
  }
  updateUser = async (req: Request, res: Response) => {
    const user = await userModel.findById(req.params.id)
    try {
      if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin
        const updatedUser = await user.save()
        res.status(200).json({
          _id: updatedUser._id,
          email: updatedUser.email,
          name: updatedUser.name,
          isAdmin: updatedUser.isAdmin
        })
      } else {
        throw new Error('user Not Found')
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

export default new userController()
