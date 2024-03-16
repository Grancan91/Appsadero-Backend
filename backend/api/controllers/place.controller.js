const Place = require('../models/place.model')

const getAllPlaces = async (req, res) => {
    try {
        const places = await Place.findAll();
        return res.status(200).json(places);
    } catch (error) {
        return res.status(500).send(">> Oops something went wrong.");
    }
}


const createPlace = async (req, res) => {
    try {
        const place = await Place.create({
            name : req.body.name,
            address: req.body.address,
            facilities: req.body.facilities,
            url: req.body.url
        })
        return res.status(200).json('Place created!')
    } catch (error) {
        return res.status(500).send(">> Oops something went wrong.")
    }
}

const getOnePlace = async (req, res) => {
    try {
        const place = await Place.findByPk(req.params.placeId);
        return res.status(200).json(place);
    } catch {
        return res.status(400).send(">> This place isn't in our Database");
    }
};

const updatePlace = async (req, res) => {
    try {
        const [placeExist, place] = await Place.update(req.body, {
            returning: true,
            where: {
                id: req.params.placeId,
            },
        });
        if (placeExist !== 0) {
            return res.status(200).json({ message: "Place updated", fields_updated: place });
        } else {
            return res.status(404).send(">> Oops! Place not found");
        }
    } catch (error) {
        return res.status(500).send(">> Error to udpate place");
    }
}

const deletePlace = async (req, res) => {
    try {
        const place = await Place.destroy({ where: { id: req.params.placeId } })
        return res.status(200).send("Place Deleted")
    } catch (err) {
        res.status(400).send(">> Place has not been deleted")
    }
}


module.exports = {
    getAllPlaces,
    getOnePlace,
    createPlace,
    deletePlace,
    updatePlace
}