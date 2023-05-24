const router = require("express").Router();
const { getAllProfiles, getOneProfile, updateProfile, deleteProfile, getEagerUserAsadero, addFriends} = require('../controllers/user.controller')
const { checkAuth, checkAdmin, checkId } = require("../middleware/auth");

router.get('/', checkAuth, getAllProfiles)
router.get('/:email', checkAuth , getOneProfile);
router.post('/addfriend', checkAuth, addFriends)
router.put("/:userId", checkAuth, checkId, updateProfile);
router.delete('/:userId', checkAuth, checkId, deleteProfile)
router.get('/:userId/asadero', checkAuth, getEagerUserAsadero)

module.exports = router;