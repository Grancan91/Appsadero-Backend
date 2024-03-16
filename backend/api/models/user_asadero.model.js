
const sequelize = require("../../db")
const { DataTypes } = require("sequelize")

const User_Asadero = sequelize.define("user_asadero", {
    isOwner: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isChef: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    status:{
        type: DataTypes.ENUM('pending', 'confirmed', 'paid', 'rejected'),
        defaultValue: "pending"
    }
})

module.exports = User_Asadero;