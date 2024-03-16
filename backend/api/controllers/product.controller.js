const Product = require("../models/product.model")
const Allergy = require("../models/allergy.model")


const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body)      
        //Add Allergy 
        if(req.body.allergy){
            product.setAllergies(req.body.allergy)
        }
        return res.status(200).json(`${product.name} created.`)
    } catch (err) {
        return res.status(404).send(">> Oops something went wrong.")
    }
}

const bulkCreateProduct = async (req, res) => {
    try {
        const products = await Product.bulkCreate(req.body)
        if(products){
            return res.status(200).json('>> Products created.')
        }
    } catch (error) {
        return res.status(404).send(">> Oops something went wrong.")
    }
}

const getOneProduct = async (req, res) => {
    try{
        const product = await Product.findOne({ where: {id: req.params.productId}})
        return res.status(200).json({
            name: product.name,
            unit: product.unit,
            price: product.price,
          })
    }catch (err){
        return res.status(400).send(err)
    }
}

const getAllProducts = async (req, res) => {
    try{
        const product = await Product.findAll()
        return res.status(200).json(product)
    } catch(err) {
        return res.status(400).send(err)
    }
}

const updateProduct = async (req, res) => {
    try {   
        const [productExist, product] = await Product.update(req.body, {
            returning: true,
            where: {
                id: req.params.productId,
            },
        });

        if(productExist !== 0){
            return res.status(200).json(`Updated to ${req.body.name}`)
        } else {
            return res.status(400).send("Can't update")
        }
    } catch (err) {
        console.log(err)
        return res.status(400).send(err)
    }
}

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.destroy({where: {id: req.params.productId}})
        return res.status(200).json(`Product has been deleted`)
    } catch (err) {
        return res.status(500).send(err)
    }
}

module.exports = {
    createProduct,
    getOneProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
    bulkCreateProduct,
}