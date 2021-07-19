import { Router } from 'express'
import asyncHandler from 'express-async-handler'
import userCn from './user.controller'
import Auth, { Admin } from '../../middlewere/auth'
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

///////////////////////////////////Admin /////////////////////////////////////////

// @Desc    get users
// @route   post /api/users
// @access  private (Admin)
userRoute.get(
  '/',
  asyncHandler(Auth),
  asyncHandler(Admin),
  asyncHandler(userCn.getAllUsers)
)

// @Desc    get user by id
// @route   post /api/users/:id
// @access  private (Admin)
userRoute.get(
  '/:id',
  asyncHandler(Auth),
  asyncHandler(Admin),
  asyncHandler(userCn.getUserById)
)

// @Desc    delete user
// @route   post /api/users
// @access  private (Admin)
userRoute.delete(
  '/:id',
  asyncHandler(Auth),
  asyncHandler(Admin),
  asyncHandler(userCn.deleteUserById)
)

// @Desc update user
// @route   put /api/users/:id
// @access private (Admin)
userRoute.put(
  '/:id',
  asyncHandler(Auth),
  asyncHandler(Admin),
  asyncHandler(userCn.updateUser)
)
export default userRoute
