import { Request, Response } from 'express'
import productModel from './product.model'
import { Review, reviewModel } from '../Helper Classes/review'
class productController {
  getAllProducts = async (req: Request, res: Response) => {
    const pageSize = 4
    const page = Number(req.query.pageNumber) || 1
    const keyword: object = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i'
          }
        }
      : {}
    const count = await productModel.find({ ...keyword }).countDocuments()
    const products = await productModel
      .find({ ...keyword })
      .limit(pageSize)
      .skip((page - 1) * pageSize)
    return res.json({ products, page, pages: Math.ceil(count / pageSize) })
  }

  getProductById = async (req: Request, res: Response) => {
    const product = await productModel.findById(req.params.id)
    if (product) return res.json(product)
    res.status(404).json({ message: 'product not found' })
  }

  getTopProduct = async (req: Request, res: Response) => {
    const products = await productModel
      .find({})
      .sort({ rating: -1 })
      .limit(3)
    if (products) return res.json(products)
    res.status(404).json({ message: 'product not found' })
  }
  deleteProduct = async (req: Request, res: Response) => {
    try {
      const id = req.params.id
      const product = await productModel.findByIdAndDelete(id)
      if (product) {
        return res.status(200).json({ message: 'Product removed' })
      }
      res.status(400)
      throw new Error('product not found')
    } catch (error) {
      res.status(500)
      throw new Error(error.message)
    }
  }

  createProduct = async (req: Request, res: Response) => {
    const {
      name,
      brand,
      category,
      price,
      countInStock,
      image,
      description
    }: {
      name: string
      brand: string
      category: string
      price: number
      countInStock: number
      image: string
      description: string
    } = req.body

    try {
      const product = new productModel({
        name,
        brand,
        category,
        price,
        countInStock,
        image,
        description,
        user: req.user._id
      })
      const newProduct = await product.save()
      res.status(200).json(newProduct)
    } catch (error) {
      res.status(401).send({ message: error.message })
    }
  }
  updateProduct = async (req: Request, res: Response) => {
    try {
      const product = await productModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          ...req.body,
          updatedAt: Date.now(),
          user: req.user._id
        }
      )
      if (product) return res.status(200).json({ message: 'product updated' })

      throw new Error('product not found')
    } catch (error) {
      res.status(401).send({ message: error.message })
    }
  }
  addReview = async (req: Request, res: Response) => {
    const { comment, rating }: { comment: string; rating: number } = req.body
    const review = new reviewModel({
      name: req.user.name,
      comment,
      rating,
      user: req.user._id
    })
    try {
      const product = await productModel.findById(req.params.id)
      if (product) {
        if (product.reviews) {
          const reviewed = product.reviews.find(
            review => review.user + '' === req.user._id.toString()
          )
          if (reviewed) {
            throw new Error('product already reviwed')
          }
          product.reviews = [...product.reviews, review]
          product.numReviews = product.reviews.length
          product.rating =
            product.reviews.reduce((a, item) => {
              if (item.rating) {
                return item.rating + a
              } else {
                return a
              }
            }, 0) / product.reviews.length
          product.updatedAt = new Date(Date.now())
          const newproduct = await product.save()
          return res.status(201).json(newproduct)
        }
        return res.status(500)
      }

      throw new Error('product not found')
    } catch (error) {
      res.status(401).send({ message: error.message })
    }
  }
}

export default new productController()
