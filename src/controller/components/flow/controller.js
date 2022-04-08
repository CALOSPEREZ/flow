import { message } from "@config/message";
import config from "@config/config.sample.json";
import { handleError, handleResponse } from "@middleware/errorHandlers";
import FlowApi from "./dao";
import { findInstalacionResource } from "./dto";
import { formate } from "@helper/help";

export const create = async (req, res) => {
  try {
    const flowApi = new FlowApi(config);
    const serviceName = "payment/create";

    const response = await flowApi.send(serviceName, formate(req.body), "POST");
    const redirect = response.url + "?token=" + response.token;
    handleResponse(res, 200, message.update, findInstalacionResource(redirect));
  } catch (error) {
    handleError(error, res);
  }
};
