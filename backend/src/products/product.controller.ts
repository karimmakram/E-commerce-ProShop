import { Request, Response } from 'express'
import productModel from './product.model'
class productController {
  getAllProducts = async (req: Request, res: Response) => {
    const products = await productModel.find({})
    return res.json(products)
  }

  getProductById = async (req: Request, res: Response) => {
    const product = await productModel.findById(req.params.id)
    if (product) return res.json(product)
    res.status(404).json({ message: 'product not found' })
  }
}

export default new productController()
