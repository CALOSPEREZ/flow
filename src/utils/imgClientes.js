import multer from  'multer'
import fs from  'fs-extra'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

const upload = multer({
    storage: multer.diskStorage({
      destination: (req, file, callback) => {
        var user_token = req.token
        let codEmpresa = user_token.user.cod_cliente
        let ext = path.extname(file.originalname).toLowerCase()
        let url
         if (ext === '.pdf')
         url = path.join(__dirname, `../public/clientes/${codEmpresa}/pdf`)

        if (ext === '.png' || ext === '.jpg' || ext === '.jpeg')
        url = path.join(__dirname, `../public/clientes/${codEmpresa}/img`)

        fs.mkdirsSync(url)
        callback(null, url)
      },
      filename: (req, file, callback) => {
        let ext = path.extname(file.originalname).toLowerCase()
        callback(null, file.originalname)
      }
    }),

  }
  ).single('ruta_archivo')

  module.exports =  upload