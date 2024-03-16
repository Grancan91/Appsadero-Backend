const Preference = require('../models/preference.model')
const Product = require('../models/product.model')

const getAllPreferences = async (req, res) => {
    try {
        const preference = await Preference.findAll()
        return res.status(200).json(preference)
    } catch (error) {
        return res.status(500).send(">> Oops something went wrong.");
    }
}


const getAllProductsForPreferences = async (req, res) => {
  try {
    const preferences = await Preference.findAll({
      attributes: ['id', 'name'],
      include: {
        model: Product,
        as: 'products',
        attributes: ['id', 'name'],
      },
    });

    return res.status(200).json(preferences);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Oops, something went wrong.");
  }
}
/*
const getAllProductsForPreferences = async (req, res) => {
    try {
        const preference = await Preference.findAll(
            {attributes: ['id', 'name']}
        )
        const product = await preference.getProducts(product)
        return res.status(200).json(product)
    } catch (error) {
        console.log(error)
        return res.status(500).send(">> Oops something went wrong.");
    }
}
*/
const getOnePreference = async (req, res) => {
    try {
        const preference = await Preference.findByPk(req.params.preferenceId)
        return res.status(200).json(preference);
    } catch (error) {
        return res.status(500).send(">> Oops something went wrong.");
    }
}
   
const createPreference = async (req, res) => {
    try {
        const preference = await Preference.create(req.body)
        return res.status(200).json('Congrats! Category successfully added.')
    } catch (error) {
        return res.status(500).send(">> Oops something went wrong.");
    }
}

const bulkCreatePreference = async (req, res) => {
    try {
        const preferences = await Preference.bulkCreate(req.body)
        if(preferences){
            return res.status(200).json('Preferences created.')
        }
    } catch (error) {
        return res.status(404).send(">> Oops something went wrong.")
    }
}

const updatePreference = async (req, res) => {
    try {
        const [prefereceExist, preference] = await Preference.update(req.body, {
            returning: true,
            where: {
                id: req.params.preferenceId,
            },
        })
        if(prefereceExist !== 0){
            return res.status(200).json({message: 'Category updated', fields_updated: preference})
        }else{
            return res.status(404).send(">> Oops! Category not found.");
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send(">> Oops something went wrong.");
    }
}

const deletePreference = async (req, res) => {
    try {
        const preference = await Preference.destroy({ where: { id: req.params.preferenceId}})
        if(preference){
            return res.status(200).json("Category deleted.")
        }else{
            return res.status(404).send('>> Category not found')
        }
    } catch (error) {
        return res.status(500).send(">> Oops something went wrong.");
    }
}




module.exports = {
    getAllPreferences,
    getAllProductsForPreferences,
    getOnePreference,
    createPreference,
    updatePreference,
    deletePreference,
    bulkCreatePreference
}
