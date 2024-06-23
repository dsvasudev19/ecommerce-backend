const { SubCategory, Category, Media } = require("./../../models");

const getAll = async (req, res, next) => {
  try {
    const subcategories = await SubCategory.findAll({
      include: [
        {
          model: Media,
          as: "featuredImage",
        },
      ],
    });
    return res.status(200).json({
      success: true,
      message: "Successfully fetched all Sub Categories",
      data: subcategories,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const subcategory = await SubCategory.findByPk(id, {
      include: [
        {
          model: Media,
          as: "featuredImage",
        },
      ],
    });

    if (!subcategory) {
      return res.status(404).json({ message: "SubCategory not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Successfully fetched all sub categories",
      data: subcategory,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const create = async (req, res,next) => {
  try {
    let data = req.body;
    const existingSubCategory = await SubCategory.findOne({
      where: {
        categoryId: data.categoryId,
        name: data.name,
      },
    });

    if (existingSubCategory) {
      return res.status(400).json({
        success: false,
        message: "SubCategory with the same name and category already exists",
      });
    }
    
    if (req.file) {
        data={...data,image:'/subCategoryMedia/'+req.file.filename}
    }
    const subcategory = await SubCategory.create(data);
    return res.status(200).json({
      success: true,
      message: "Successfully created Sub Category",
      data: subcategory,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const update = async (req, res,next) => {
  try {
    const { id } = req.params;
    const { categoryId, name, status } = req.body;

    const subcategory = await SubCategory.findByPk(id);
    if (!subcategory) {
      return res.status(404).json({ message: "SubCategory not found" });
    }

    await subcategory.update({ categoryId, name, status });
    return res.status(200).json({
      success: true,
      message: "Successfully updated the sub-category",
      data: subcategory,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteById = async (req, res,next) => {
  try {
    const { id } = req.params;

    const subcategory = await SubCategory.findByPk(id);
    if (!subcategory) {
      return res
        .status(404)
        .json({ success: false, message: "SubCategory not found" });
    }

    await subcategory.destroy();
    return res
      .status(200)
      .json({ success: true, message: "SubCategory deleted successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
};
