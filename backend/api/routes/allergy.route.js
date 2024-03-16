const router = require("express").Router();
const { getAllAllergies, getOneAllergy, createAllergy,
    updateAllergy, deleteAllergy, bulkCreateAllergy } = require('../controllers/allergy.controller');
const { checkAuth, checkAdmin } = require("../middleware/auth");


router.get("/", checkAuth, getAllAllergies);  //All users
router.get("/:allergyId", checkAuth, getOneAllergy); //Get one All users
router.post("/", checkAuth, checkAdmin, createAllergy); // Create only admin
router.post('/bulk', checkAuth, checkAdmin, bulkCreateAllergy)
router.put("/:allergyId", checkAuth, checkAdmin, updateAllergy); // Update only admin
router.delete("/:allergyId", checkAuth, checkAdmin, deleteAllergy); // Delete only admin

module.exports = router;