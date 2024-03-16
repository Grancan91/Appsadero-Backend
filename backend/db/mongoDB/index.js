const mongoose = require('mongoose');

const uri = `mongodb+srv://abllopper:2dwmvZXzP3l8aoFd@appsadero.o8jbvb3.mongodb.net/?retryWrites=true&w=majority&appName=Appsadero`;

async function dbConnect() {
    try{
        await mongoose.connect(uri);
        console.log("Database Connected")

    }
    catch (error) {
        console.log('error moongose')
    }
}

module.exports = { dbConnect }