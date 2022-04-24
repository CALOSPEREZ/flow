const { Sequelize } = require("sequelize");
import * as config from "./libs/config";
import { FlowModel } from "./models/Flowl";

let db = null;
export const database = () => {
  if (!db) {
    const sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      config.params
    );
    db = {
      sequelize,
      Sequelize,
    };
  }
  return db;
};
const timestap = { timestamps: false };
const flowM = database().sequelize.define("flow", FlowModel, timestap);

const syncModels = async () => {
  try {
    await flowM.sync({ alter: true });
  } catch (error) {
    console.log(error);
  }
};

syncModels();
export const flow = flowM;
