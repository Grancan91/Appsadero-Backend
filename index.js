require('dotenv').config();
const express = require('express');
const sequelize = require('./db/index');

const app = express();

const router = require('./api/routes/index')

const dbConection = async () => {
    try {
        await sequelize.authenticate()
        console.log('>> Connection has been established successfully')
        sequelize.sync() //  {force: true}
        console.log('>> Models synchronized')
    } catch (error) {
        console.log(error)
        throw new Error('>> Database connection error');
    }
}


const expressListener = async () => {
    try {
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