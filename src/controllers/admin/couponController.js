const {Coupon} = require('./../../models'); // Adjust the path as necessary

const getAll = async (req, res) => {
    try {
        const coupons = await Coupon.findAll();
        res.status(200).json(coupons);
    } catch (error) {
        res.status(500).json({message: 'Error retrieving coupons', error});
    }
}

// Get coupon by ID
const getById = async (req, res) => {
    try {
        const {id} = req.params;
        const coupon = await Coupon.findByPk(id);

        if (!coupon) {
            return res.status(404).json({message: 'Coupon not found'});
        }

        res.status(200).json(coupon);
    } catch (error) {
        res.status(500).json({message: 'Error retrieving coupon', error});
    }
}

// Create a new coupon
const create = async (req, res) => {
    try {
        const coupon = await Coupon.create(req.body);
        res.status(201).json(coupon);
    } catch (error) {
        res.status(500).json({message: 'Error creating coupon', error});
    }
}

// Update a coupon
const update = async (req, res) => {
    try {
        const {id} = req.params;
        const [updated] = await Coupon.update(req.body, {where: {id}});

        if (!updated) {
            return res.status(404).json({message: 'Coupon not found'});
        }

        const updatedCoupon = await Coupon.findByPk(id);
        res.status(200).json(updatedCoupon);
    } catch (error) {
        res.status(500).json({message: 'Error updating coupon', error});
    }
}

// Delete a coupon
const deleteCoupon = async (req, res) => {
    try {
        const {id} = req.params;
        const deleted = await Coupon.destroy({where: {id}});

        if (!deleted) {
            return res.status(404).json({message: 'Coupon not found'});
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({message: 'Error deleting coupon', error});
    }
}

// Delete all expired coupons
const deleteAllExpired = async (req, res) => {
    try {
        const currentDate = moment().toDate();
        const deletedCount = await Coupon.destroy({
            where: {
                endDate: {
                    [Op.lt]: currentDate,
                },
            },
        });

        res.status(200).json({message: `${ deletedCount } expired coupons deleted`});
    } catch (error) {
        res.status(500).json({message: 'Error deleting expired coupons', error});
    }
}

// Disable a specific coupon
const disableCoupon = async (req, res) => {
    try {
        const {id} = req.params;
        const [updated] = await Coupon.update({isActive: false}, {where: {id}});

        if (!updated) {
            return res.status(404).json({message: 'Coupon not found'});
        }

        res.status(200).json({message: 'Coupon disabled'});
    } catch (error) {
        res.status(500).json({message: 'Error disabling coupon', error});
    }
}

// Activate all coupons
const activateAll = async (req, res) => {
    try {
        await Coupon.update({isActive: true}, {where: {}});
        res.status(200).json({message: 'All coupons activated'});
    } catch (error) {
        res.status(500).json({message: 'Error activating coupons', error});
    }
}

module.exports={
    getAll,
    getById,
    create,
    update,
    activateAll,
    disableCoupon,
    deleteAllExpired,
    deleteCoupon
}

