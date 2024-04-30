
const { Category, Media } = require("./../models")
const { sequelize } = require("./../models");


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


module.exports = {
    getAll,
    getById,
}