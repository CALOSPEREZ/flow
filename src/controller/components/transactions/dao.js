import {
  Sintoma, User

} from '@services/db'
export const getSintomaAll = async (id) => {
  try {
    return await Sintoma.findAll({
      where: {
        userId: id
      }
    })
  } catch (error) {
    throw error
  }
}
export const getSintomaById = async (id, userId) => {
  try {
    return await Sintoma.findByPk(id, {
      where: {
        userId: userId
      }
    })
  } catch (error) {
    throw error
  }
}
export const updateSintomaById = async (id, data) => {
  try {
    const model = await Sintoma.findByPk(id)
    return await model.update(data, { new: true })
  } catch (error) {
    throw error
  }
}


export const registerSintoma = async (id, data) => {
  try {
    const modelUser = await User.findByPk(id);
    const modelSintoma = await Sintoma.bulkCreate(data);
    return modelUser.addSintomas(modelSintoma).then(resole =>  modelSintoma);
  } catch (error) {
    throw error
  }
}

export const deleteSintoma = async (id) => {
  try {
   
return await Sintoma.destroy({ where: { id: id } })

  } catch (error) {
    throw error
  }
}


