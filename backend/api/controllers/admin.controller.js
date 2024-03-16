const User = require('../models/user.model');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const createNewUser = async (req, res) => {
    try {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
        const user = await User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password
        })
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1y' })

        return res.status(200).json({
            message: "Profile successfully created!",
            first_name: user.first_name ,
            last_name: user.last_name
            
        })

    } catch (error) {
        console.error(error)
        return res.status(404).send(">> Oops something went wrong creating your profile.")
    }

}

const updateUser = async (req, res) => {
    try {
        const [userExist, user] = await User.update(req.body, {
            returning: true,
            where: {
                id: req.params.userId,
            },
        });
        if (userExist !== 0) {
            return res.status(200).json({ message: "User updated", fields_updated: user });
        } else {
            return res.status(404).send(">> User not found");
        }
    } catch (error) {
        return res.status(500).send(">> Error to udpate user");
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.destroy({ where: { id: req.params.userId } });
        return res.status(200).json("User deleted")
    } catch {
        return res.status(500).send(">> Error to udpate user")
    }
}


module.exports = { createNewUser, updateUser, deleteUser}