const { Staff, Designation } = require("./../../models");
const bcrypt = require("bcrypt");

// Get all staff members
const getAllStaff = async (req, res, next) => {
  try {
    const staff = await Staff.findAll({
      include: [{ model: Designation, as: "designation" }],
    });
    res.status(200).json({ success: true, data: staff });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Get a single staff member by ID
const getStaffById = async (req, res, next) => {
  try {
    const staff = await Staff.findByPk(req.params.id, {
      include: [{ model: Designation, as: "designation" }],
    });

    if (!staff) {
      return res
        .status(404)
        .json({ success: false, message: "Staff member not found" });
    }

    res.status(200).json({ success: true, data: staff });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Create a new staff member
const createStaff = async (req, res, next) => {
  try {
    const {
      first_name,
      last_name,
      email,
      phone,
      username,
      dob,
      doj,
      password,
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newStaff = await Staff.create({
      first_name,
      last_name,
      email,
      phone,
      username,
      dob,
      doj,
      password: bcrypt.hashSync(password, 10),
    });

    res
      .status(201)
      .json({
        success: true,
        message: "Staff member created successfully",
        data: newStaff,
      });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Update an existing staff member
const updateStaff = async (req, res, next) => {
  try {
    const staff = await Staff.findByPk(req.params.id);
    if (!staff) {
      return res
        .status(404)
        .json({ success: false, message: "No Staff found with given id" });
    }
    const {
      first_name,
      last_name,
      email,
      phone,
      username,
      dob,
      doj,
      password,
    } = req.body;
    const hashedPassword = password
      ? await bcrypt.hashSync(password, 10)
      : undefined;

    const updatedFields = {
      first_name,
      last_name,
      email,
      phone,
      username,
      dob,
      doj,
    };

    if (hashedPassword) {
      updatedFields.password = hashedPassword;
    }

    const updatedStaff = await staff.update(updatedFields);

    if (!updatedStaff[0]) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Staff member not found or no changes made",
        });
    }

    res
      .status(200)
      .json({ success: true, message: "Staff member updated successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Delete a staff member
const deleteStaff = async (req, res, next) => {
  try {
    const staff = await Staff.findByPk(req.params.id);
    if (!staff) {
      return res
        .status(404)
        .json({ success: false, message: "No Staff found with given id" });
    }

    const deleted = await staff.destroy();

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Staff member not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Staff member deleted successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Analytics: Total number of staff members
const getTotalStaffCount = async (req, res, next) => {
  try {
    const totalStaff = await Staff.count();
    res.status(200).json({ success: true, data: totalStaff });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Analytics: Staff members by designation
const getStaffByDesignation = async (req, res, next) => {
  try {
    const staffByDesignation = await Designation.findAll({
      include: [{ model: Staff, as: "staff" }],
      group: ["Designation.name"],
    });

    res.status(200).json({ success: true, data: staffByDesignation });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  getAllStaff,
  getStaffById,
  createStaff,
  updateStaff,
  deleteStaff,
  getTotalStaffCount,
  getStaffByDesignation,
};
