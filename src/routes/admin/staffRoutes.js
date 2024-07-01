const express = require('express');
const router = express.Router();
const staffController = require('./../../controllers/admin/staffController');

// Get all staff members
router.get('/', staffController.getAllStaff);

// Get a single staff member by ID
router.get('/:id', staffController.getStaffById);

// Create a new staff member
router.post('/', staffController.createStaff);

// Update an existing staff member
router.put('/:id', staffController.updateStaff);

// Delete a staff member
router.delete('/:id', staffController.deleteStaff);

// Analytics routes
router.get('/analytics/total-staff', staffController.getTotalStaffCount);
router.get('/analytics/staff-by-designation', staffController.getStaffByDesignation);

module.exports = router;
