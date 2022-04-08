
const Sequelize = require('sequelize');
export const UserModel = {
  id: {
    type: Sequelize.DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  nombre_cliente: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false
  },
  cod_cliente: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false
  },
  cod_empresa: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false
  },
  cod_inicial: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false
  },
  cod_final: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false
  },
  ruta_sublogo: {
    type: Sequelize.DataTypes.STRING,
  },
  ruta_logo: {
    type: Sequelize.DataTypes.STRING
  },
  habilitado: {
    type: Sequelize.DataTypes.TINYINT,
    allowNull: false
  },
  reporte: {
    type: Sequelize.DataTypes.TINYINT,
    allowNull: true
  },
  medidatLogo: {
    type: Sequelize.DataTypes.TINYINT,
    allowNull: true
  },
  medidatSublogo: {
    type: Sequelize.DataTypes.TINYINT,
    allowNull: true
  },
  email: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false
  },
  email_verified_at: {
    type: Sequelize.DataTypes.TIME,
    allowNull: true
  },
  password: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false
  },
  remember_token: {
    type: Sequelize.DataTypes.STRING,
    allowNull: true
  },
  created_at: {
    type: Sequelize.DataTypes.TIME,
    defautValue: Sequelize.NOW,
  },
  updated_at: {
    type: Sequelize.DataTypes.TIME,
    defautValue: Sequelize.NOW,
  },
  super: {
    type: Sequelize.DataTypes.TINYINT,
    allowNull: false
  }
}