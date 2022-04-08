const Sequelize = require("sequelize");
export const UserExternoModel = {
    id: {
        type: Sequelize.DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    nombres: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    apellidos: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    rut: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    fecha_registro: {
        type: Sequelize.DataTypes.DATEONLY,
        defaultValue: Sequelize.DataTypes.NOW
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
