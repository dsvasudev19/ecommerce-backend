const {Vendor} = require("./../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Get all vendors
const getAll = async (req, res, next) => {
    try {
        const vendors = await Vendor.findAll();
        return res.status(200).json({message: "Successfully fetched all vendors", data: vendors});
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// Get vendor by ID
const getById = async (req, res, next) => {
    try {
        const vendor = await Vendor.findByPk(req.params.id);
        if (!vendor) {
            return res.status(404).json({message: "Vendor not found"});
        }
        return res.status(200).json({message: "Vendor fetched successfully", data: vendor});
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// Create new vendor
const createVendor = async (req, res, next) => {
    try {
        const {name, email, password} = req.body;

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const newVendor = await Vendor.create({name, email, password: hashedPassword});
        return res.status(201).json({message: "Vendor created successfully", data: newVendor});
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// Update existing vendor
const updateVendor = async (req, res, next) => {
    try {
        const {name, email, password} = req.body;
        const vendor = await Vendor.findByPk(req.params.id);
        if (!vendor) {
            return res.status(404).json({message: "Vendor not found"});
        }

        // Hash the new password if provided
        const hashedPassword = password ? await bcrypt.hash(password, 10) : vendor.password;

        await vendor.update({name, email, password: hashedPassword});
        return res.status(200).json({message: "Vendor updated successfully", data: vendor});
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// Delete vendor
const deleteVendor = async (req, res, next) => {
    try {
        const vendor = await Vendor.findByPk(req.params.id);
        if (!vendor) {
            return res.status(404).json({message: "Vendor not found"});
        }

        await vendor.destroy();
        return res.status(200).json({message: "Vendor deleted successfully"});
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// Vendor login
const login = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const vendor = await Vendor.findOne({where: {email}});

        if (!vendor) {
            return res.status(404).json({message: "Vendor not found"});
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, vendor.password);
        if (!isMatch) {
            return res.status(401).json({message: "Incorrect password"});
        }

        // Generate JWT token
        const token = jwt.sign({id: vendor.id}, process.env.JWT_SECRET, {expiresIn: '1h'});

        return res.status(200).json({message: "Login successful", token});
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// Get vendor by token (after login)
const getVendorByToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const vendor = await Vendor.findByPk(decoded.id);

        if (!vendor) {
            return res.status(404).json({message: "Vendor not found"});
        }

        return res.status(200).json({message: "Vendor fetched successfully", data: vendor});
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports = {
    getAll,
    getById,
    createVendor,
    updateVendor,
    deleteVendor,
    login,
    getVendorByToken
};
