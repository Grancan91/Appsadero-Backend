const sequelize = require('../../db/index')
const {DataTypes} = require('sequelize')

const Place = sequelize.define("place", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  facilities: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: true,
    },
  },
});

module.exports = Place;