const { where } = require("sequelize");
const { Product, Media, sequelize } = require("./../../models");
const category = require("../../models/category");
const { features } = require("process");
const slugify=require("slugify")

const getAll = async (req, res, next) => {
  try {
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

    product.stock += quantity;
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

    return res.status(200).json({ message: 'Product pricing updated successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update product pricing', error: error.message });
  }
};

const create = async (req, res, next) => {
  const t = await sequelize.transaction();
  let data=req.body;
  try {
    if(req.file){
      data={...data,url:'/productMedia/'+req.file.filename}
    }
    const product = await Product.create({...data,slug:slugify(req.body.name)}, { transaction: t });
    if (product) {
      t.commit()
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
    t.rollback();
    console.log(error);
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      await product.update({...req.body,slug:slugify(req.body.name),url:product.url});
      if (req.file) {
        product.url='/productMedia/'+req.file.filename;
        await product.save();
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
