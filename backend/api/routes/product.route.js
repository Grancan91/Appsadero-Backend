const router = require("express").Router()
const { 
    createProduct, 
    getOneProduct, 
    getAllProducts, 
    updateProduct, 
    deleteProduct, 
    bulkCreateProduct
 } = require("../controllers/product.controller")
const { checkAuth, checkAdmin } = require("../middleware/auth")

router.get("/", checkAuth, getAllProducts)
router.get("/:productId", checkAuth, getOneProduct)
router.post("/", checkAuth, createProduct)
router.post('/bulk', checkAuth, checkAdmin, bulkCreateProduct)
router.put("/:productId", checkAuth, checkAdmin, updateProduct)
router.delete("/:productId", checkAuth, checkAdmin, deleteProduct)

module.exports = router