const router = require('express').Router()

router.use('/profile', require('./profile.route'));
router.use("/auth", require('./auth.route'));
router.use('/asadero', require('./asadero.route'))
router.use('/place', require('./place.route'))
//router.use('/allergy', require('./allergy.route'))
router.use('/product', require('./product.route'))
router.use('/cart', require('./cart.route'))

module.exports = router;