const User = require('../models/user.model');
const Asadero = require("../models/asadero.model")
const User_Asadero = require('../models/user_asadero.model')

const getAllProfiles = async (req, res) =>  {
  try {
    const user = await User.findAll({ attributes: ['id', 'first_name', 'nickname', 'email'] })
    return res.status(200).json(user)
     
  } catch (error) {
    return res.status(500).send(">> Oops something went wrong.")
  }
}


const getOneProfile = async (req, res) =>  {
    try{
        const user = await User.findOne({ where: {nickname: req.params.nickname} })
        return res.status(200).json({id: user.id, first_name: user.first_name, nickname: user.nickname})
    }catch{
        return res.status(400).send(">> This user isn't in our Database");
    }
 }


const updateProfile = async (req, res) => {
  try {
    if (parseInt(req.params.userId) === res.locals.user.id){
      const [userExist, user] = await User.update(req.body, {
        returning: true,
        where: {
          id: req.params.userId,
        },
      });
      if (userExist !== 0) {
        return res.status(200).json({ message: "User updated", fields_updated: user });
        
      } else {
        return res.status(404).send(">> User not found.");
      }
    }
    res.status(500).send(">> Access denied.")

  } catch (error) {
    return res.status(500).send(">> Error to udpate user.");
  }
}

const deleteProfile = async(req, res) => {
  try {
    if (parseInt(req.params.userId) === res.locals.user.id) {
    const user = await User.destroy({ where: { id: req.params.userId } });
    return res.status(200).json("User deleted.")
    }
    res.status(500).send(">> Access denied.")
  }catch{
    return res.status(500).send(">> Error to udpate user.")
  }
}

//Controllers of the relationship between users and their friends
const getAllFriends = async (req, res) => {
  try {
    const user = res.locals.user;
    const friends = await user.getFriend(
    { attributes: ['id', 'first_name', 'nickname', 'email'] })
    res.status(200).json(friends);
  } catch (error) {
    return res.status(500).send(">> Oops, something went wrong. Maybe this user doesn't have any friends yet.");
  }
};

const getOneFriend = async (req, res) => {
  try{
    const user = res.locals.user;
    const friend = await User.findOne({
      where: {
        id: req.params.friendId
      }
    })
    await user.getFriend()
    return res.status(200).json({
      first_name: friend.first_name,
      nickname: friend.nickname,
      email: friend.email
    })
  } catch (error) {
    return res.status(400).send('>> Friend not found')
  }
} 


const addFriend = async (req, res) => {
  try {
    const user = res.locals.user;
    const friends = req.params.friendId;

    if (friends.id !== user.id) {
      const friend = await User.findOne({ where: { id: friends} });
      if (friend) {
        const isAlreadyFriend = await user.hasFriend(friend);
        if (!isAlreadyFriend) {
          await user.addFriend(friend);
          return res.status(200).json({
            first_name: friend.first_name,
            nickname: friend.nickname,
            email: friend.email
          });
        } else {
          return res.status(400).send(`>> User is already a friend.`);
        }
      } else {
        return res.status(404).send(`>> Friend not found.`);
      }
    }
      return res.status(500).send('>> Cannot be your own friend in this DB.');   
  } catch (error) {
    return res.status(500).send('>> An error occurred while adding a friend');
  }
};

const addFriendByNickname = async (req, res) => {
  try {
    const user = res.locals.user;
    const friends = req.body.nickname

    if (friends !== user.nickname) {
    const friend = await User.findOne({where: { nickname: req.body.nickname}})
      if (friend) {
        const isAlreadyFriend = await user.hasFriend(friend);
        if (!isAlreadyFriend) {
          await user.addFriend(friend);
          return res.status(200).json({
            first_name: friend.first_name,
            nickname: friend.nickname,
            email: friend.email
          });
        } else {
          return res.status(400).send(`>> User is already a friend.`);
        }
      } else {
        return res.status(404).send(`>> Friend not found.`);
      }
    }
      return res.status(500).send('>> Cannot be your own friend in this DB.');   
  } catch (error) {
    console.error(error)
    return res.status(500).send('>> An error occurred while adding a friend');
  }
};



const deleteFriend = async (req, res) => {
  try {
    const user = res.locals.user;
    const friend = await User.findByPk(req.params.friendId)
    if (friend) {
      const isAlreadyFriend = await user.hasFriend(friend);
      if (!isAlreadyFriend) {
        return res.status(400).send('>> Friend not found')
      }
    await user.removeFriend(friend)
    return res.status(200).json('Friend deleted')
    }
  } catch (error) {
    return res.status(400).send('>> Friend not found')
  }
}

const payAsadero = async (req, res) => {
  try {
      const user = res.locals.user
      const asadero = await Asadero.findByPk(req.params.asaderoId)
      await User_Asadero.update(
          { status: 'paid' },
          { where: { 
            asaderoId: asadero.id, 
            userId: user.id,
            status: 'pending' } }
      );
      return res.status(200).json('Great! You paid!')
  } catch (error) {
      console.log(error)
      return res.status(500).send(">> Oops something went wrong.")
  }
}



//ejemplo
module.exports = {
  getAllProfiles,
  getOneProfile,
  updateProfile,
  deleteProfile,
  addFriend,
  addFriendByNickname,
  deleteFriend,
  getAllFriends,
  getOneFriend,
  payAsadero
  
};