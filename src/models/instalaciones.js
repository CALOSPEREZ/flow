const Sequelize = require("sequelize");



export const InstalacionModel = {
    id: {
        type: Sequelize.DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    name_externo: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    idioma: {
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