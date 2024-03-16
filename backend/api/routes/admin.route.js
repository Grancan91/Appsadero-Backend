const router = require("express").Router();
const { createNewUser, updateUser, deleteUser } = require('../controllers/admin.controller')
const { checkAuth, checkAdmin} = require("../middleware/auth");
 
router.post("/", checkAuth, checkAdmin, createNewUser); 
router.put("/:userId", checkAuth, checkAdmin, updateUser);
router.delete('/:userId', checkAuth, checkAdmin, deleteUser);

module.exports = router;