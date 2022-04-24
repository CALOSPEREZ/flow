import * as CryptoJS from "crypto-js";
import { config } from "@config/config";
import jwt from "jsonwebtoken";
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
const ds = (params, method) => {
  switch (params) {
    case 1:
      return ds_plan(config.ds, method);
      break;
    default:
      return 0;
      break;
  }
};
const ds_database = (params) => {
  switch (params) {
    case 1:
      return true;
      break;
    default:
      return false;
      break;
  }
};
const ds_plan = (config, method) => {
  switch (method) {
    case 1:
      return config.basico;
      break;

    default:
      return config.avanzado;
      break;
  }
};
const categorys_database = (params) => {
  switch (params) {
    case 1:
      return "restaurante";
      break;
    case 2:
      return "agencia";
      break;
    case 3:
      return "museo";
      break;
    default:
      return "salud";
      break;
  }
};
const plan_database = (method) => {
  switch (method) {
    case 1:
      return "basico";
      break;
    case 2:
      return "intermedio";
      break;

    default:
      return "avanzado";
      break;
  }
};
export const formate = (param, token) => {
  return {
    commerceOrder:
      Math.floor(Math.random(10) * (2000 - Math.random(1000) + 1)) + 1100,
    subject: param.subject,
    currency: param.currency,
    amount: categorys(param.category, param.type) + ds(param.ds, param.ds_type),
    email: param.email,
    paymentMethod: param.paymentMethod,
    urlConfirmation: config.baseURL + config.payment_confirm,
    urlReturn: config.baseURL + `/result?token=${token}`,
  };
};
export const formateDatabase = (param) => {
  return {
    flowOrder: param.commerceOrder,
    nombre_cliente: param.subject,
    plan: categorys_database(param.category),
    tipo_plan: plan_database(param.type),
    design: ds_database(param.ds),
    tipo_design: param.ds_type >= 1 ? plan_database(param.ds_type) : "",
    monto_design: ds(param.ds, param.ds_type),
    monto_plan: categorys(param.category, param.type),
    email: param.email,
    token: param.token,
  };
};
export const formateDatabaseupdateinitial = (param, token) => {
  return {
    flowOrder: param.commerceOrder,
    token: token,
  };
};
export const formateDatabaseUpdate = (param) => {
  return {
    token: param.token,
    payment_date: param.paymentData.date,
    payment_amount: param.paymentData.amount,
    amount: param.amount,
    transferDate: param.paymentData.transferDate,
    media: param.paymentData.media,
    currency: param.paymentData.currency,
  };
};

export const JWT = (param) =>
  jwt.sign(param, "my_secret_ke", {
    // expiresIn: "10m",
  });
