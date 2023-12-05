import multer from 'multer'
import { __dirname } from '../path.js'

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'src/public/img')
    },
    filename: (req,file,cb) => {
        cb(null,`${Date.now()}${file.originalname}`)
    }
})

export const uploader = multer({storage})