import { message } from '@config/message'
import { handleError, handleResponse } from '@middleware/errorHandlers'
import {
  getSintomaAll,
  getSintomaById,
  updateSintomaById,
  registerSintoma,
  deleteSintoma
} from './dao'
import {
  sintomasResource,
  sintomaResource,
  sintomaDeleteResource
} from './dto'


export const list = async (req, res) => {
  try {
    const { id } = req.token.user;
    const data = await getSintomaAll(id);
    handleResponse(res, 200, message.success_long, sintomasResource(data))
  } catch (error) {
    handleError(error, res)
  }
}

export const listCat = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getSintomaAll(id);
    handleResponse(res, 200, message.success_long, sintomasResource(data))
  } catch (error) {
    handleError(error, res)
  }
}
export const findById = async (req, res) => {
  try {
    const { user } = req.token;
    var { id } = req.params;
    const data = await getSintomaById(id, user.id)
    handleResponse(res, 200, message.success_long, sintomaResource(data))
  } catch (error) {
    handleError(error, res)
  }
}
export const update = async (req, res) => {
  try {
    const id = req.params.id
    const instacion = req.body

    const data = await updateSintomaById(id, instacion)

    handleResponse(res, 200, message.update, sintomaResource(data))
  } catch (error) {
    handleError(error, res)
  }
}
export const register = async (req, res) => {

  const { id } = req.token.user
  let { data } = req.body
  data = await registerSintoma(id, data)
  handleResponse(res, 200, message.create_success, sintomasResource(data))

}


export const destroy = async (req, res) => {
  const id = req.params.id
  const   data = await deleteSintoma(id)
  handleResponse(res, 200, message.create_success, sintomaDeleteResource(data))

}


