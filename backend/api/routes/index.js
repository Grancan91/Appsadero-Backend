const router = require('express').Router()

router.use('/profile', require('./profile.route')) //It's ME like User
router.use('//', require('./admin.route')) //Functions for Admin
router.use("/auth", require('./auth.route')) //Functions of Signup and Login for all users
router.use('/asadero', require('./asadero.route')) 
router.use('/place', require('./place.route'))
router.use('/preference', require('./preference.route'))
router.use('/product', require('./product.route'))
router.use('/cart', require('./cart.route'))
router.use('/allergy', require('./allergy.route'))
router.use('/friend', require('./friend.route'))

module.exports = router;