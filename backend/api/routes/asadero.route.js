const router = require("express").Router();
const { 
    getAllAsaderos, 
    getAllMyAsaderos,
    getOneAsadero, 
    getOneMyAsadero,
    createAsadero, 
    updateAsadero, 
    deleteAsadero, 
    getUsersFromAsadero, 
    addUserToAsadero, 
    deleteUserFromAsadero,
    rejectUsersFromAsadero,
    getMyOwnAsaderos,
    getSharedAsaderos,
} = require("../controllers/asadero.controller.js");
const { checkOwner, checkAuth, checkAdmin } = require("../middleware/auth");

router.get('/myOwnAsaderos', checkAuth, getMyOwnAsaderos) // ALL ASADEROS I OWN
router.get('/', checkAuth,checkAdmin, getAllAsaderos) // ONLY ADMIN
router.get('/myAsaderos',checkAuth, getAllMyAsaderos) // ALL ASADEROS WHERE USER IS IN
router.get("/:asaderoId/users", checkAuth, getUsersFromAsadero) // ALL USERS INVITED
router.get("/:asaderoId", checkAuth, checkAdmin, getOneAsadero) // ONLY ADMIN
router.get('/myAsaderos/:asaderoId', checkAuth, getOneMyAsadero) // ONE ASADERO WHERE USER IS IN
router.get('/sharedAsaderos/:userId2', checkAuth, getSharedAsaderos) // GET ASADEROS 2 PAX ARE SHARING
router.post("/:asaderoId/user/:userId", checkAuth, checkOwner, addUserToAsadero)
router.post('/', checkAuth, createAsadero)
router.put('/:asaderoId/close/', checkAuth, checkOwner, rejectUsersFromAsadero)
router.patch('/:asaderoId', checkAuth, checkOwner, updateAsadero)
router.delete('/:asaderoId', checkAuth, checkOwner, deleteAsadero) 
router.delete("/:asaderoId/user/:userId",  deleteUserFromAsadero);


module.exports = router;