const sequelize = require('../../db/index')
const {DataTypes} = require('sequelize')

const Asadero = sequelize.define("asadero", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  date_time: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      isDate: true,
    },
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
  confirmation_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      isDate: true,
    },
  },
  payments_accepted: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isOpen: {
    type: DataTypes.BOOLEAN,
    allowNull:false,
    defaultValue: true
  }
});

module.exports = Asadero;