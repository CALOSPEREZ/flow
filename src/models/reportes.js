const Sequelize = require("sequelize");
export const reporteModel = {
    id: {
        type: Sequelize.DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    json_contacto: {
        type: Sequelize.DataTypes.JSON,
        allowNull: false,
    },
    json_sintomas: {
        type: Sequelize.DataTypes.JSON,
        allowNull: false,
    },
    json_usuario_externo: {
        type: Sequelize.DataTypes.JSON,
        allowNull: false,
    },
    entidad_externa: {
        type: Sequelize.DataTypes.JSON,
        allowNull: true,
    },
    json_area: {
        type: Sequelize.DataTypes.JSON,
        allowNull: false,
    },
    json_instalacion: {
        type: Sequelize.DataTypes.JSON,
        allowNull: false,
    },
    json_sintomas: {
        type: Sequelize.DataTypes.JSON,
        allowNull: false,
    },
    createdAt: {
        type: Sequelize.DataTypes.DATEONLY,
        defautValue: Sequelize.NOW,
    },
    updatedAt: {
        type: Sequelize.DataTypes.DATEONLY,
        defautValue: Sequelize.NOW,
    }
}
