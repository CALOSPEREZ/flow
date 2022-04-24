import { flow } from "@services/db";
export const flowcreate = async (data) => {
  try {
    const datos = await flow.create(data);
    return datos;
  } catch (error) {
    throw error;
  }
};
export const flowupdate = async (data) => {
  try {
    const model = await flow.findOne({ where: { token: data.token } });
    return await model.update(data, { new: true });
  } catch (error) {
    throw error;
  }
};
export const show = async (data) => {
  try {
    return await flow.findOne({ where: { id: data } });
  } catch (error) {
    throw error;
  }
};
export const flowupdateinitial = async (data, id) => {
  try {
    const model = await flow.findOne({ where: { id: id } });
    return await model.update(data, { new: true });
  } catch (error) {
    throw error;
  }
};
