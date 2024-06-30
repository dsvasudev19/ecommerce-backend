const { where } = require("sequelize");
const { Product, Media, sequelize } = require("./../../models");
const category = require("../../models/category");
const { features } = require("process");

const getAll = async (req, res, next) => {
  try {
    // TODO:Need to modify logic to get images also
    const products = await Product.findAll();
    if (products) {
      return res
        .status(200)
        .json({
          success: true,
          message: "Successfully fetched all products",
          data: products,
        });
    } else {
      return res
        .status(200)
        .json({ success: false, message: "No products found", data: [] });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    // TODO:include media to get images, need to modified after writing associations
    const product = await Product.findByPk(req.params.id);
    if (product) {
      return res
        .status(200)
        .json({
          success: true,
          message: "Successfully fetched the product",
          data: product,
        });
    } else {
      return res
        .status(200)
        .json({ success: false, message: "No product found", data: [] });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateProductInventory = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Example: Update stock quantity
    product.stock += quantity; // Adjust stock based on quantity received
    await product.save();

    res.status(200).json({ message: 'Product inventory updated successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update product inventory', error: error.message });
  }
};

const setProductStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.status = status;
    await product.save();

    res.status(200).json({ message: 'Product status updated successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update product status', error: error.message });
  }
};

const adjustProductPricing = async (req, res) => {
  const { id } = req.params;
  const { price, discount } = req.body;

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.price = price;
    product.discount = discount;
    await product.save();

    res.status(200).json({ message: 'Product pricing updated successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update product pricing', error: error.message });
  }
};

const create = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const product = await Product.create(req.body, { transaction: t });
    const mediaData = {
      mediable_id: product.id,
      mediable_type: "Product",
      url: "",
      name: req.file.originalname,
      file_name: req.file.filename,
      file_type: req.file.mimetype,
      file_size: req.file.size,
      path: "/uploads/productMedia",
      featured: true,
    };

    const featuredImage = Media.create(mediaData, { transaction: t });

    if (product && featuredImage) {
      return res
        .status(200)
        .json({
          success: true,
          message: "Successfully Created the Product",
          data: product,
        });
    } else {
      return res
        .status(200)
        .json({ success: false, message: "Error while creating the product" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      await Product.Update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      if (req.file) {
        const mediaData = {
          mediable_id: product.id,
          mediable_type: "Product",
          url: "",
          name: req.file.originalname,
          file_name: req.file.filename,
          file_type: req.file.mimetype,
          file_size: req.file.size,
          path: "/uploads/productMedia",
          featured: true,
        };
        const featuredImage = Media.Update(mediaData, {
          where: { mediable_id: product.id },
          transaction: t,
        });
        return res
        .status(200)
        .json({ success: true, message: "Successfully Updated the Product" });
      }
      
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Product Not found." });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      await product.destroy();
      return res
        .status(200)
        .json({ success: true, message: "Successfully deleted the product" });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Product Not found" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getAllSimilarCategoryProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: {
        categoryId: req.params.categoryId,
      },
    });
    if (products) {
      return res
        .status(200)
        .json({
          success: true,
          message: "Successfully fetched all products",
          data: products,
        });
    } else {
      return res
        .status(200)
        .json({ success: false, message: "No products found", data: [] });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteProduct,
  getAllSimilarCategoryProducts,
  adjustProductPricing,
  updateProductInventory,
  setProductStatus
};
