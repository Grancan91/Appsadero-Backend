const router = require("express").Router()
const {
  createCart,
  getOneCart,
  getAllCart,
  //updateCart,
  deleteCart,
  addProductsToCart,
  deleteProductFromCart,
  getAllProductsFromCart,
} = require("../controllers/cart.controller");
const { checkAuth, checkAdmin, checkOwner } = require("../middleware/auth")

router.get("/", checkAuth, checkAdmin, getAllCart)
router.get("/:cartId/products", checkAuth, getAllProductsFromCart);
router.get("/:cartId", checkAuth, getOneCart)
router.post("/", checkAuth, checkAdmin, createCart) // ONLY admin can create a cart without creating first an asadero
//router.put("/:cartId", checkAuth, updateCart)
router.put('/:cartId/product/:productId', checkAuth, addProductsToCart)
router.delete("/:cartId", checkAuth, checkAdmin, deleteCart) // ONLY ADMIN
router.delete('/:cartId/product/:productId', checkAuth, deleteProductFromCart)

module.exports = router