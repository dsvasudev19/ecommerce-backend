const express = require('express');
const router = express.Router();
const couponController = require('../../controllers/admin/couponController');


router.get('/', couponController.getAll);


router.get('/:id', couponController.getById);


router.post('/', couponController.create);


router.put('/:id', couponController.update);


router.delete('/:id', couponController.deleteCoupon);


router.delete('/expired', couponController.deleteAllExpired);


router.put('/:id/disable', couponController.disableCoupon);


router.put('/activate-all', couponController.activateAll);

module.exports = router;
