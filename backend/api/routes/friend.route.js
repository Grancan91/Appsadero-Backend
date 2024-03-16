const router = require("express").Router();
const {
    addFriend,
    addFriendByNickname,
    deleteFriend,
    getAllFriends,
    getOneFriend } = require('../controllers/user.controller')
const { checkAuth } = require("../middleware/auth");


router.get('/', checkAuth, getAllFriends)

router.put('/add', checkAuth, addFriendByNickname)
router.put('/add/:friendId', checkAuth, addFriend)
router.delete('/:friendId', checkAuth, deleteFriend)
router.get('/:friendId', checkAuth, getOneFriend)

module.exports = router;