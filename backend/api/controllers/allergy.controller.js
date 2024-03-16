const Allergy = require('../models/allergy.model')

const getAllAllergies = async (req, res) => {
    try {
        const allergy = await Allergy.findAll();
        return res.status(200).json(allergy);
    } catch (error) {
        return res.status(500).send(">> Oops something went wrong.");
    }
}



const getOneAllergy = async (req, res) => {
    try {
        const allergy = await Allergy.findByPk(req.params.allergyId);
        return res.status(200).json(allergy);
    } catch {
        return res.status(400).send(">> This allergy isn't in our Database");
    }
}

const createAllergy = async (req, res) => {
    try {
        const allergy = await Allergy.create({name: req.body.name})
        return res.status(200).json('Allergy created!')
    } catch (error) {
        return res.status(500).send(">> Oops something went wrong.")
    }
}

const bulkCreateAllergy  = async (req, res) => {
    try {
        const allergies = await Allergy.bulkCreate(req.body)
        if(allergies){
            return res.status(200).json('Allergies created.')
        }
    } catch (error) {
        console.log(error)
        return res.status(404).send(">> Oops something went wrong.")
    }
}

const updateAllergy = async (req, res) => {
    try {
        const [allergyExist, allergy] = await Allergy.update(req.body, {
            returning: true,
            where: {
                id: req.params.allergyId,
            },
        });
        if (allergyExist !== 0) {
            return res.status(200).json({ message: "Allergy updated", fields_updated: allergy });
        } else {
            return res.status(404).send(">> Oops! Allergy not found");
        }
    } catch (error) {
        return res.status(500).send(">> Error to udpate allergy");
    }
}

const deleteAllergy = async (req, res) => {
    try {
        const allergy = await Allergy.destroy({ where: { id: req.params.allergyId } })
        return res.status(200).send("Allergy Deleted")
    } catch (err) {
        res.status(400).send(">> Allergy has not been deleted")
    }
}



module.exports = {
    getAllAllergies,
    getOneAllergy,
    createAllergy,
    updateAllergy,
    deleteAllergy,
    bulkCreateAllergy
}