const Sequelize = require("sequelize");
export const ContactoModel = {
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
        defautValue: Sequelize.NOW,
    },
    updatedAt: {
        type: Sequelize.DataTypes.DATEONLY,
        defautValue: Sequelize.NOW,
    }
}
