const Sequelize = require("sequelize");
export const CategoriaModel = {
  id: {
    type: Sequelize.DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  idioma: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  orden: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: false,
  },
  nombre_categoria: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  tipo_categoria: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  ruta_archivo: {
    type: Sequelize.DataTypes.STRING,
  },
  opcion: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  valor: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DataTypes.TIME,
    defautValue: Sequelize.NOW,
  },
  updatedAt: {
    type: Sequelize.DataTypes.TIME,
    defautValue: Sequelize.NOW,
  },
  id_cliente: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },

  url_externa: {
    type: Sequelize.DataTypes.STRING,
  },
  habilitado: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
}