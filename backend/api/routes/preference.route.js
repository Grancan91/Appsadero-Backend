const router = require("express").Router();
const { 
    getAllPreferences,
    getAllProductsForPreferences,
    getOnePreference, 
    createPreference, 
    updatePreference, 
    deletePreference, 
    bulkCreatePreference 
} = require('../controllers/preference.controller')
const {checkAuth, checkAdmin} = require('../middleware/auth')

router.get('/', checkAuth, getAllPreferences)
router.get('/products', checkAuth, getAllProductsForPreferences)
router.get('/:preferenceId', checkAuth, getOnePreference)
router.post('/', checkAuth, checkAdmin, createPreference)
router.post('/bulk', checkAuth, checkAdmin, bulkCreatePreference)
router.put('/:preferenceId', checkAuth, checkAdmin, updatePreference)
router.delete('/:preferenceId', checkAuth, checkAdmin, deletePreference)



module.exports = router;
