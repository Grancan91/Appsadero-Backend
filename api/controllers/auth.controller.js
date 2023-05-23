const User = require('../models/user.model');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


const signUp = async (req, res) => {
    try {
        req.body.password = bcrypt.hashSync(req.body.password, process.env.SALT_ROUNDS);
        const user = await User.create(req.body)

        //REMEMBER CHANGE EXPIRATES SESSION 
        const token = jwt.sign({email: user.email}, process.env.JWT_SECRET, {expiresIn: '1y'})

        //delete user.password;
        res.status(200).json({token});

    } catch (error) {
        res.status(500).send(">> Oops something went wrong, we could not sign you up.")
/*         console.error('>> Error signing up :(')
 */    }
}

const logIn = async(req, res) => {
    try{
        const user = await User.findOne({ where: {email: req.body.email} })

        if(user){
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if(result){
                    //REMEMBER CHANGE EXPIRATES SESSION 
                    const token = jwt.sign({email: user.email}, process.env.JWT_SECRET, {expiresIn: '1y'})
                    res.status(200).json({token});
                }
                res.status(400).send(">> Oops something went wrong, user or password incorrect.")
            })
        }else{
            res.status(400).send(">> Oops something went wrong, user or password incorrect.")
        }
        
    }catch(error) {
        res.status(400).send(">> Oops something went wrong, user or password incorrect.")
    }
}



module.exports = { signUp, logIn }