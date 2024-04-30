const { where } = require("sequelize");
const { Category, Media } = require("./../../models")
const { sequelize } = require("./../../models");
const { includes } = require("lodash");

const getAll = async (req, res, next) => {
    try {
        const categories = await Category.findAll({
            include:[
                {
                    model:Media,
                    as:'featuredImage'
                }
            ]
        });
        if (categories) {
            return res.status(200).json({ success: true, message: "Successfully fetched all Categories", data: categories })
        } else {
            return res.status(200).json({ success: false, message: "No Categories found", data: [] })

        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const getById = async (req, res, next) => {
    try {
        const category = await Category.findByPk(req.params.id,{
            include:[
                {
                    model:Media,
                    as:'featuredImage'
                }
            ]
        });
        if (category) {
            return res.status(200).json({ success: true, message: "Successfully fetched the category", data: category })
        } else {
            return res.status(200).json({ success: false, message: "No Category found", data: [] })
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const create = async (req, res, next) => {
    const t = sequelize.transaction();
    console.log(req.file)
    try {
        const { name } = req.body;
        const categoryExists = await Category.findOne({
            where: {
                name
            }
        })
        if (!categoryExists) {
            const category = await Category.create(req.body);
            const mediaData = {
                mediable_id: category.id,
                mediable_type: "Category",
                url: "",
                name: req.file.originalname,
                file_name: req.file.filename,
                file_type: req.file.mimetype,
                file_size: req.file.size,
                path: 'uploads/category',
                featured: true,
            }
            const categoryMedia = await Media.create(mediaData);
            if (category && categoryMedia) {
                return res.status(200).json({ success: true, message: "Successfully Created the Category", data: category });
            } else {
                return res.status(400).json({ success: false, message: "Error while creating the category" })
            }
        }
        return res.status(400).json({ success: false, message: "Category With the Same Name Already Exists" })
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const updateById = async (req, res, next) => {
    const t=sequelize.transaction();
    try {
        const category = await Category.findByPk(req.params.id);
        if (category) {
            await Category.update(req.body, {
                where: {
                    id: req.params.id
                }
            });
            const mediaData = {
                mediable_id: category.id,
                mediable_type: "Category",
                url: "",
                name: req.file.originalname,
                file_name: req.file.filename,
                file_type: req.file.mimetype,
                file_size: req.file.size,
                path: 'uploads/category',
                featured: true,
            }
            await Media.update(mediaData, {
                where: {
                    mediable_id: req.params.id
                }
            })
            return res.status(200).json({ success: true, message: "Successfully Updated the category" })
        } else {
            return res.status(404).json({ success: false, message: "Category Not found" });
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const deleteCategory = async (req, res, next) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (category) {
            await category.destroy();
            return res.status(200).json({ success: true, message: "Successfully Deleted the category" });
        } else {
            return res.status(404).json({ success: false, message: "Category Not found" })
        }
    } catch (error) {
        console.log(error);
        next(error)
    }
}

module.exports = {
    getAll,
    getById,
    create,
    updateById,
    deleteCategory
}