const sequelize = require("../../db")
const { DataTypes } = require("sequelize")

const Product_Cart = sequelize.define("product_cart", {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1
    },
    buyed: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    
    }
})

module.exports = Product_Cart;