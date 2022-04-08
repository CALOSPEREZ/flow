import { check, validationResult } from 'express-validator'
import { message } from '@config/message'
import { handleResponse } from '@middleware/errorHandlers'
import { getSintomaById, } from '../dao'


export const createRequest = async (req, res, next) => {
  await check("data").isArray().withMessage("data debe ser un arreglo").notEmpty().withMessage(`data ${message.message_request} `).run(req);
  await check("data.*.descripcion", ` descripcion ${message.message_request} `).notEmpty().run(req);
  await check("data.*.idioma", ` idioma ${message.message_request} `).notEmpty().run(req);
  const request = validationResult(req);
  if (!request.isEmpty()) {
    return res.status(422).json(request)
  } else {
    next()
  }
}

export const updateRequest = async (req, res, next) => {
  await check("descripcion", ` descripcion ${message.message_request} `).notEmpty().run(req);
  await check("idioma", ` idioma ${message.message_request} `).notEmpty().run(req);
  const request = validationResult(req)
  if (!request.isEmpty()) {
    return res.status(422).json(request)
  } else {
    next()
  }
}

export const ExistRequest = async (req, res, next) => {
  const validate = await getSintomaById(req.params.id)

  if (!validate) {
    handleResponse(res, 400, message.not_found_long)
  } else {
    next()
  }
}
