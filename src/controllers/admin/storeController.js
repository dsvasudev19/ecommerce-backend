const {Store, Vendor} = require("./../../models");

// Get all stores
const getAll = async (req, res, next) => {
    try {
        const stores = await Store.findAll({
            include: {
                model: Vendor,
                as: 'vendor',
                attributes: ['id', 'name', 'email'],  
            },
        });
        return res.status(200).json({message: "Successfully fetched all stores", data: stores});
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// Get store by ID
const getById = async (req, res, next) => {
    try {
        const store = await Store.findByPk(req.params.id, {
            include: {
                model: Vendor,
                as: 'vendor',
                attributes: ['id', 'name', 'email'],
            },
        });

        if (!store) {
            return res.status(404).json({message: "Store not found"});
        }

        return res.status(200).json({message: "Store fetched successfully", data: store});
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// Create new store
const createStore = async (req, res, next) => {
    try {
        const {vendorId, name, address, city, state, country, pincode, img} = req.body;

        const vendor = await Vendor.findByPk(vendorId);
        if (!vendor) {
            return res.status(404).json({message: "Vendor not found"});
        }

        const newStore = await Store.create({vendorId, name, address, city, state, country, pincode, img});
        return res.status(201).json({message: "Store created successfully", data: newStore});
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// Update existing store
const updateStore = async (req, res, next) => {
    try {
        const {name, address, city, state, country, pincode, img} = req.body;
        const store = await Store.findByPk(req.params.id);

        if (!store) {
            return res.status(404).json({message: "Store not found"});
        }

        await store.update({name, address, city, state, country, pincode, img});
        return res.status(200).json({message: "Store updated successfully", data: store});
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// Delete store
const deleteStore = async (req, res, next) => {
    try {
        const store = await Store.findByPk(req.params.id);
        if (!store) {
            return res.status(404).json({message: "Store not found"});
        }

        await store.destroy();
        return res.status(200).json({message: "Store deleted successfully"});
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports = {
    getAll,
    getById,
    createStore,
    updateStore,
    deleteStore,
};
