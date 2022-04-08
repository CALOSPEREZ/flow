import multer from  'multer'
import fs from  'fs-extra'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

const upload = multer({
    storage: multer.diskStorage({
      destination: (req, file, callback) => {
        let codEmpresa = req.cod_cliente
        let ext = path.extname(file.originalname).toLowerCase()
        let url

        if (ext === '.png' || ext === '.jpg' || ext === '.jpeg')
        url = path.join(__dirname, `../public/clientes/${codEmpresa}/logo`)
        fs.mkdirsSync(url)
        callback(null, url)
      },
      filename: (req, file, callback) => {
        callback(null, uuidv4() + path.extname(file.originalname).toLocaleLowerCase())
      }
    }),

  }
  ).any()

  module.exports =  upload