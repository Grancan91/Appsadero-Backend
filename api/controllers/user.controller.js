const User = require('../models/user.model');

const getAllProfiles = async (req, res) =>  {
  try {
    const user = await User.findAll()
    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).send(">> Oops something went wrong.")
  }
}


const getOneProfile = async (req, res) =>  {
    try{
        const user = await User.findOne({ where: {email: req.params.email} })
        delete user.password
        return res.status(200).json({Name: user.first_name})
    }catch{
        return  res.status(400).send(">> This user isn't in our Database");
    }
 }

const createNewProfile = async (req, res) => {
    try {
        const user = await User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password:req.body.password
        })
        return res.status(200).json({
            message: ">> Profile successfully created!", 
            user: {user}})

    } catch (error) {
        return res.status(404).send(">> Oops something went wrong creating your profile.")
    }
    
}

const updateProfile = async (req, res) => {
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
      return res.status(404).send("User not found");
    }
  } catch (error) {
    return res.status(500).send("Error to udpate user");
  }
};

const deleteProfile = async(req, res) => {
  try {
    const user = await User.destroy({ where: { id: req.params.userId } });
    return res.status(200).json("User deleted")
  }catch{
    return res.status(500).send("Error to udpate user")
  }
}


module.exports = {
  getAllProfiles,
  getOneProfile,
  createNewProfile,
  updateProfile,
  deleteProfile,
};