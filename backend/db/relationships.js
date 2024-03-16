const Asadero = require('../api/models/asadero.model')
const Place = require('../api/models/place.model')
const User = require('../api/models/user.model')
const Preference = require('../api/models/preference.model')
const Product = require('../api/models/product.model')
const Cart = require('../api/models/cart.model')
const Allergy = require('../api/models/allergy.model')
const Product_Cart = require('../api/models/products_carts.model')
const User_Asadero = require('../api/models/user_asadero.model')

const initRelationships = () => {

    //Allergies -> Products
    Allergy.belongsToMany(Product, { through: 'allergies_products' })
    Product.belongsToMany(Allergy, { through: 'allergies_products' })

    //User ->  Allergy
    User.belongsToMany(Allergy, { through: 'users_allergies' })
    Allergy.belongsToMany(User, { through: 'users_allergies' })

    //@OneToMany Preferences w Products
    Preference.hasMany(Product)
    Product.belongsTo(Preference)

    //@ManyToMany Preferences w Users --> table in the middle USER_PREFERENCE
    User.belongsToMany(Preference, {through: 'users_preferences'})
    Preference.belongsToMany(User, { through: 'users_preferences' })

    //Users -> Users -> Friends =)
    User.belongsToMany(User, { through: 'Friends', as: 'friend', onDelete: "cascade", })

    // User -> Asadero
    User.belongsToMany(Asadero, { through: User_Asadero })
    Asadero.belongsToMany(User, { through: User_Asadero })

    // Asadero -> ShoppingCart
    Asadero.hasOne(Cart)
    Cart.belongsTo(Asadero)

    //Products -> Cart
    Product.belongsToMany(Cart, { through: Product_Cart })
    Cart.belongsToMany(Product, { through: Product_Cart })

    //Asadero -> Places
    Asadero.hasOne(Place)
    Place.belongsTo(Asadero)

}

module.exports = {
    initRelationships
}