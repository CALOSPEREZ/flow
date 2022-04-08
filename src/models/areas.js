const Sequelize = require("sequelize");
export const AreaModel = {
  id: {
        type: Sequelize.DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
       type: Sequelize.DataTypes.DATEONLY,
    defaultValue: Sequelize.DataTypes.NOW
    },
    updatedAt: {
       type: Sequelize.DataTypes.DATEONLY,
    defaultValue: Sequelize.DataTypes.NOW
    }

}
