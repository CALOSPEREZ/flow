import { check, validationResult } from 'express-validator'
import { message } from '@config/message'
 


export const createRequest = async (req, res, next) => {
  await check("nombre", ` nombre ${message.message_request} `).notEmpty().run(req);
  await check("telefono", ` telefono ${message.message_request} `).notEmpty().run(req);
  await check("plan", ` plan ${message.message_request} `).notEmpty().run(req);
  await check("descripcion", ` descripcion ${message.message_request} `).notEmpty().run(req);
  await check("fromEmail", ` fromEmail ${message.message_request} `).notEmpty().run(req);
  await check("costo", ` costo ${message.message_request} `).notEmpty().run(req);
  const request = validationResult(req);
  if (!request.isEmpty()) {
    return res.status(422).json(request)
  } else {
    next()
  }
}
 

