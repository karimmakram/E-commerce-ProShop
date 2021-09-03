import express from 'express'
import multer, { Multer } from 'multer'
import path from 'path'

const router = express.Router()
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads')
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  }
})

const checkFileType = (
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const fileType = /jpg|png|jpeg/
  const extname = fileType.test(path.extname(file.originalname).toLowerCase())
  const mimetype = fileType.test(file.mimetype)
  if (extname && mimetype) return cb(null, true)
  else cb(new Error('Images Only'))
}
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb)
  }
})
router.post('/', upload.single('image'), (req, res) => {
  if (req.file) res.send(`\\${req.file.path}`)
})
export default router
