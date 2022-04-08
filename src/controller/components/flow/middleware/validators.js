import { check, validationResult } from "express-validator";
import { message } from "@config/message";

export const createRequest = async (req, res, next) => {
  await check("subject", ` subject ${message.message_request} `)
    .notEmpty()
    .run(req);
  await check("email", ` email ${message.message_request} `)
    .notEmpty()
    .run(req);
  await check("currency", ` currency ${message.message_request} `)
    .notEmpty()
    .run(req);
  await check("type", ` type ${message.message_request} `).notEmpty().run(req);
  await check("category", ` category ${message.message_request} `)
    .notEmpty()
    .run(req);
  await check("paymentMethod", ` paymentMethod ${message.message_request} `)
    .notEmpty()
    .run(req);
  const request = validationResult(req);
  if (!request.isEmpty()) {
    return res.status(422).json(request);
  } else {
    next();
  }
};
