const Sequelize = require("sequelize");
export const SintomaModel = {
    id: {
        type: Sequelize.DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    descripcion: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    idioma: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
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
