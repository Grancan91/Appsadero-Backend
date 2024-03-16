const sequelize = require("../../db")
const {DataTypes} = require("sequelize")

const Product = sequelize.define("product", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    unit: {
        type: DataTypes.STRING,
        defaultValue: "ud"
    },
    price: {
        type: DataTypes.DOUBLE,
        defaultValue: 0
    }
})

module.exports = Product;
