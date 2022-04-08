import { validationResult } from 'express-validator'
import fs from 'fs-extra'

export const handleError = async (error, res) => {
  res.status(500).json({
    status: 'error',
    message: 'SERVER ERROR',
    error: error.toString()
  })
}

export const handleValidationResult = (req, res) => {
  const request = validationResult(req)
  if (!request.isEmpty()) return res.status(422).json(request)
}

export const handleCleanImages = async (req) => {
  if (req.file && req.file.filename) {
    await fs.unlink(req.file.path)
  } else if (req.files && req.files.length > 0) {
    req.files.forEach(async (file) => {
      await fs.unlink(file.path)
    })
  }
}
export const handleResponse = (res, status, menssage_resp, data={}) => {
  res.status(status).json({
    message: menssage_resp,
    data: data
  })
}
