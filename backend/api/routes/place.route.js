const router = require("express").Router();
const { getAllPlaces, getOnePlace, createPlace, updatePlace, deletePlace} = require("../controllers/place.controller");
const { checkAuth, checkAdmin} = require("../middleware/auth");

router.get("/", checkAuth, getAllPlaces);
router.get("/:placeId", checkAuth, getOnePlace);
router.post("/", checkAuth, createPlace); 
router.put("/:placeId", checkAuth, updatePlace);
router.delete("/:placeId", checkAuth, checkAdmin, deletePlace);

module.exports = router;
