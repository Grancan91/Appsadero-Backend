const sequelize = require('../../db/index')
const {DataTypes} = require('sequelize')

const User = sequelize.define("user", {
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nickname: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      //validation: pass with at least 8 char: 1 caracter especial, 1 minuscula, 1 mayus
    }
  },
  role: {
    type: DataTypes.ENUM('admin', 'not Admin'),
    defaultValue: "not Admin",
  },
});


module.exports = User;