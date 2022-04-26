import { message } from "@config/message";
import config from "@config/config.sample.json";
import { handleError, handleResponse } from "@middleware/errorHandlers";
import FlowApi from "./dao";
import { findInstalacionResource, reporteResource } from "./dto";
import {
  formate,
  formateDatabase,
  formateDatabaseUpdate,
  formateDatabaseupdateinitial,
  JWT,
} from "@helper/help";
import { flowcreate, flowupdate, flowupdateinitial, show } from "./daoDatabase";

export const create = async (req, res) => {
  try {
    const flowApi = new FlowApi(config);
    const serviceName = "payment/create";

    const data = await flowcreate(formateDatabase(req.body));
    const token = JWT({ id: data.id });
    const body = formate(req.body, token);
    const response = await flowApi.send(serviceName, body, "POST");

    const update = formateDatabaseupdateinitial(body, response.token);
    flowupdateinitial(update, data.id);
    handleResponse(
      res,
      200,
      message.update,
      findInstalacionResource(response.url + "?token=" + response.token)
    );
  } catch (error) {
    handleError(error, res);
  }
};

export const payment_confirm = async (req, res) => {
  try {
    let params = {
      token: req.body.token,
    };
    let serviceName = "payment/getStatus";
    const flowApi = new FlowApi(config);
    let response = await flowApi.send(serviceName, params, "GET");
    response.token = params.token;
    const update = formateDatabaseUpdate(response);
    flowupdate(update);
    handleResponse(res, 200, message.update, response);
  } catch (error) {
    handleError(error, res);
  }
};
export const result = async (req, res) => {
  try {
    const data = await show(req.token.id);
    handleResponse(res, 200, message.update, reporteResource(data));
  } catch (error) {
    handleError(error, res);
  }
};

export const resultR = async (req, res) => {
  try {
    const data = req.query.token;
    res.redirect(`https://landingqr.netlify.app/result/?token=${data}`);
  } catch (error) {
    handleError(error, res);
  }
};
export const info = async (req, res) => {
  try {
    let params = {
      token: req.query.token,
    };
    let serviceName = "payment/getStatus";
    const flowApi = new FlowApi(config);
    let response = await flowApi.send(serviceName, params, "GET");
    handleResponse(res, 200, message.update, response);
  } catch (error) {
    handleError(error, res);
  }
};
