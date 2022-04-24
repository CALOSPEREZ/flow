const Sequelize = require("sequelize");
export const FlowModel = {
  id: {
    type: Sequelize.DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  flowOrder: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: true,
  },
  cod_cliente: {
    type: Sequelize.DataTypes.STRING,
  },
  nombre_cliente: {
    type: Sequelize.DataTypes.STRING,
    allowNull: true,
  },
  plan: {
    type: Sequelize.DataTypes.STRING,
    allowNull: true,
  },
  tipo_plan: {
    type: Sequelize.DataTypes.STRING,
    allowNull: true,
  },
  design: {
    type: Sequelize.DataTypes.STRING,
    allowNull: true,
  },
  tipo_design: {
    type: Sequelize.DataTypes.STRING,
    allowNull: true,
  },
  monto_design: {
    type: Sequelize.DataTypes.STRING,
  },
  monto_plan: {
    type: Sequelize.DataTypes.STRING,
    allowNull: true,
  },
  token: {
    type: Sequelize.DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: Sequelize.DataTypes.STRING,
    allowNull: true,
  },
  currency: {
    type: Sequelize.DataTypes.STRING,
    allowNull: true,
  },
  media: {
    type: Sequelize.DataTypes.STRING,
    allowNull: true,
  },
  amount: {
    type: Sequelize.DataTypes.STRING,
    allowNull: true,
  },

  payment_date: {
    type: Sequelize.DataTypes.DATE,
    defautValue: Sequelize.NOW,
  },
  payment_amount: {
    type: Sequelize.DataTypes.STRING,
    allowNull: true,
  },
  transferDate: {
    type: Sequelize.DataTypes.DATE,
    defautValue: Sequelize.NOW,
  },
  created_at: {
    type: Sequelize.DataTypes.DATE,
    defautValue: Sequelize.NOW,
  },
  updated_at: {
    type: Sequelize.DataTypes.DATE,
    defautValue: Sequelize.NOW,
  },
};
