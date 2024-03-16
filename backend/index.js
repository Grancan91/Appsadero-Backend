require('dotenv').config();
const morgan = require('morgan')
const express = require('express');
const cors = require('cors')
const sequelize = require('./db/index');
const { initRelationships } = require('./db/relationships');
const app = express();
const router = require('./api/routes/index');

const dbConection = async () => {
    try {
        await sequelize.authenticate()
        console.log('>> Connection has been established successfully')
        initRelationships()
        await sequelize.sync(); //  {force: true} {alter: true}
        console.log('>> Models synchronized')
    } catch (error) {
        console.log(error)
        throw new Error('>> Database connection error');
    }
}

const expressListener = async () => {
    try {
        app.use(cors({origin: '*'}))
        app.use(morgan('dev'))
        app.use(express.json())
        app.use('/api', router)
        await app.listen(process.env.PORT)
        console.log('>> Appsadero is running!')
        await dbConection();
    } catch (error) {
        console.log(error)
        throw new Error('>> Connection error')
    }
}

expressListener();