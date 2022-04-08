const Sequelize = require("sequelize");
export const ExternoModel = {
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
        defautValue: Sequelize.NOW,
    },
    updatedAt: {
        type: Sequelize.DataTypes.DATEONLY,
        defautValue: Sequelize.NOW,
    }
}
