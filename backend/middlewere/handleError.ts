import { Request, Response, NextFunction } from 'express'
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.originalUrl)

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode)
  res.json({ message: err.message })
}

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404)
  res.json({ message: `url ${req.originalUrl} Not Found` })
}
