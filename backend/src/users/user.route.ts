import { Router } from 'express'
import asyncHandler from 'express-async-handler'
import userCn from './user.controller'
import Auth from '../../middlewere/auth'
const userRoute = Router()

// @Desc    register user
// @route   post /api/users
// @access  public
userRoute.post('/', asyncHandler(userCn.registerUser))

// @Desc    login user
// @route   post /api/users/login
// @access  public
userRoute.post('/login', asyncHandler(userCn.Login))

// @Desc    profile user
// @route   get /api/users/profile
// @access  private
userRoute
  .route('/profile')
  .get(asyncHandler(Auth), asyncHandler(userCn.userProfile))

// @Desc    update user profile
// @route   put /api/users/profile
// @access  private
userRoute
  .route('/profile')
  .put(asyncHandler(Auth), asyncHandler(userCn.updateProfile))
export default userRoute
