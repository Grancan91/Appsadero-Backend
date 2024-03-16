const Asadero = require("../models/asadero.model");
const User = require("../models/user.model");
const Cart = require("../models/cart.model");
const User_Asadero = require("../models/user_asadero.model");
const { Op } = require("sequelize");
const sequelize = require("../../db");

const getAllAsaderos = async (req, res) => {
  try {
    const asadero = await Asadero.findAll();
    if (asadero) {
      return res.status(200).json(asadero);
    } else {
      return res.status(400).send(">> Oops, no asaderos yet.");
    }
  } catch (error) {
    return res.status(500).send(">> Oops something went wrong.");
  }
};

const getAllMyAsaderos = async (req, res) => {
  try {
    const user = await User.findByPk(res.locals.user.id, {
      include: Asadero,
    });
    return res.status(200).json(user.asaderos);
  } catch (error) {
    return res.status(500).send(">> Oops something went wrong.");
  }
};

const getMyOwnAsaderos = async (req, res) => {
  try {
    const user = await User.findByPk(res.locals.user.id, {
      where: { email: req.params.email },
      include: [
        {
          model: Asadero,
          through: { where: { isOwner: true } },
        },
      ],
    });
    return res.status(200).json(user.asaderos);
  } catch (error) {
    return res.status(500).send(">> Oops something went wrong.");
  }
};

const getOneAsadero = async (req, res) => {
  try {
    const asadero = await Asadero.findByPk(req.params.asaderoId);
    return res.status(200).json(asadero);
  } catch {
    return res.status(400).send(">> This asadero isn't in our Database.");
  }
};

const getOneMyAsadero = async (req, res) => {
  try {
    const user = await User.findByPk(res.locals.user.id, {
      where: {
        id: asadero.id,
      },
      include: Asadero,
    });
    return res.status(200).json(user.asaderos);
  } catch (error) {
    return res.status(400).send(">> Oops something went wrong.");
  }
};

const getUsersFromAsadero = async (req, res) => {
  try {
    const asadero = await Asadero.findOne({
      where: {
        id: req.params.asaderoId,
      },
      include: User,
    });
    if (asadero.users) {
      return res.status(200).json({
        users: asadero.users.map((user) => ({
          id: user.id,
          first_name: user.first_name,
          email: user.email,
          status: user.user_asadero.status,
          isOwner: user.user_asadero.isOwner,
          isChef: user.user_asadero.isChef,
        })),
      });
    } else {
      return res.status(400).send(">> No users in the asadero.");
    }
  } catch (error) {
    return res.status(500).send(">> Oops something went wrong.");
  }
};

const getSharedAsaderos = async (req, res) => {
  try {
    const user1 = await User.findByPk(res.locals.user.id, {
      include: Asadero,
    });

    const user2 = await User.findByPk(req.params.userId2, {
      include: Asadero,
    });

    const asaderos1 = user1.asaderos.map(
      (el) => `${el.name} - ${el.date_time}`
    );
    const asaderos2 = user2.asaderos.map(
      (el) => `${el.name} - ${el.date_time}`
    );

    const shared = asaderos1.filter((el) => {
      return asaderos2.includes(el);
    });
    const sharedSet = new Set(shared);
    const result = [...sharedSet];

    // console.log('user1' + asaderos1)
    // console.log('user2' + asaderos2)
    // console.log(result)

    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send(">> Oops something went wrong.");
  }
};

const createAsadero = async (req, res) => {
  console.log(req.body)
  try {
    const asadero = await Asadero.create(req.body);
    const user = res.locals.user;
    if (asadero) {
      await Cart.create({ asaderoId: asadero.id });
      await asadero.addUser(user.id, {
        through: { isOwner: true, isChef: false, status: "confirmed" },
      });
      return res.status(200).json(asadero);
    } else {
      return res.status(400).send(">> Oops something went wrong.");
    }
  } catch (error) {
    return res.status(500).send(">> Oops something went wrong.");
  }
};

const updateAsadero = async (req, res) => {
  console.log(req.body)
  try {
    const [asaderoExist, asadero] = await Asadero.update(req.body, {
//      returning: true,
      where: {
        id: req.params.asaderoId,
      },
    });
    if (asaderoExist !== 0) {
      return res
        .status(200)
        .json({ message: "Asadero updated.", fields_updated: asadero });
    } else {
      return res.status(404).send(">> Oops, asadero not found.");
    }
  } catch (error) {
    return res.status(500).send("Error to udpate the asadero.");
  }
};

const addUserToAsadero = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.params.userId } });
    const asadero = await Asadero.findOne({
      where: { id: req.params.asaderoId },
    });
    await asadero.addUser([user], {
      through: {
        isChef: req.body.isChef,
        status: req.body.status,
      },
    });
    return res.status(200).json(asadero);
  } catch (error) {
    console.log(error);
    return res.status(500).send(">> Oops something went wrong.");
  }
};

const deleteAsadero = async (req, res) => {
  try {
    const asadero = await Asadero.destroy({ where: { id: req.params.userId } });
    if (asadero) {
      return res.status(200).json("Asadero deleted");
    } else {
      return res.status(400).send(">> Asadero has not been deleted.");
    }
  } catch (err) {
    return res.status(500).send(">> Asadero has not been deleted.");
  }
};

const deleteUserFromAsadero = async (req, res) => {
  try {
    const user_asadero = await User_Asadero.findOne({
      where: {
        asaderoId: req.params.asaderoId,
        userId: req.params.userId,
      },
    });
    await user_asadero.destroy();
    return res.status(200).json("User has been deleted.");
  } catch (error) {
    return res.status(500).send(">> Oops something went wrong.");
  }
};

const rejectUsersFromAsadero = async (req, res) => {
  try {
    const asadero = await Asadero.findByPk(req.params.asaderoId);
    await User_Asadero.update(
      { status: "rejected" },
      { where: { asaderoId: asadero.id, status: "pending" } }
    );
    return res.status(200).json("asadero closed");
  } catch (error) {
    console.log(error);
    return res.status(500).send(">> Oops something went wrong.");
  }
};


module.exports = {
  getAllAsaderos,
  getOneAsadero,
  createAsadero,
  deleteAsadero,
  updateAsadero,
  getUsersFromAsadero,
  addUserToAsadero,
  deleteUserFromAsadero,
  getAllMyAsaderos,
  getOneMyAsadero,
  rejectUsersFromAsadero,
  getMyOwnAsaderos,
  getSharedAsaderos,
};
