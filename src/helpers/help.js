import * as CryptoJS from "crypto-js";
import { config } from "@config/config";

const categorys = (params, method) => {
  switch (params) {
    case 1:
      return plan(config.restaurantes, method);
      break;
    case 2:
      return plan(config.agencia, method);
      break;
    case 3:
      return plan(config.museo, method);
      break;
    default:
      return plan(config.salud, method);
      break;
  }
};
const plan = (config, method) => {
  switch (method) {
    case 1:
      return config.basico;
      break;
    case 2:
      return config.intermedio;
      break;

    default:
      return config.avanzado;
      break;
  }
};
export const formate = (param) => {
  return {
    commerceOrder: Math.floor(Math.random() * (2000 - 1100 + 1)) + 1100,
    subject: param.subject,
    currency: param.currency,
    amount: categorys(param.category, param.type),
    email: param.email,
    paymentMethod: param.paymentMethod,
    urlConfirmation: config.baseURL + "/payment_confirm",
    urlReturn: config.baseURL + "/result",
  };
};
