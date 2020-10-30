const responseService = require("../services/response.service");
const message = require("../constants/response.const");
const { User } = require("../mongoose/models/user.mongoose.model");
const { Type } = require("../mongoose/models/type.mongoose.model");
const { Product } = require("../mongoose/models/product.mongoose.model");
const { Category } = require("../mongoose/models/category.mongoose.model");
const paginateService = require("../services/paginate.service");
const mongoose = require("mongoose");
const { PAGE_SIZE } = require("../constants/pagination.const");

const productController = {};

productController.getAllProducts = async (req, res) => {
    let page = parseInt(req.query.page);
    // let products = await Product.find().lean();
    let pageCount = Math.ceil((await Product.count()) / PAGE_SIZE);
    let products = await paginateService(Product, undefined, page);
    responseService(res, 200, message.SUCCESS, { products, pageCount });
};

// productController.getProductById = async (req, res) => {
//     let product = await Product.findById({ _id: req.params.id }).lean();
//     if (!product) return responseService(res, 404, message.NOT_FOUND);
//     responseService(res, 200, message.SUCCESS, product);
// };

productController.getProductByKeyword = async (req, res) => {
    let page = parseInt(req.query.page);
    let query = { productName: new RegExp(req.query.keyword, "i") };
    let pageCount = Math.ceil((await Product.count()) / PAGE_SIZE);
    let product = await paginateService(Product, query, page);
    if (product.length === 0) return responseService(res, 404, message.NOT_FOUND);
    responseService(res, 200, message.SUCCESS, { product, pageCount });
};

// productController.getProductByType = async (req, res) => {
//     let typeId = await Type.findOne({ typeName: req.query.type });
//     if (!typeId) return responseService(res, 404, message.NOT_FOUND);
//     let product = await Product.find().byProductTypeId(typeId._id);
//     if (product.length === 0) return responseService(res, 404, message.NOT_FOUND);
//     responseService(res, 200, message.SUCCESS, product);
// };

productController.createProduct = async (req, res) => {
    let categories = [];

    let product = req.body;

    let type = await Type.findOne({
        typeName: product.typeName.toLowerCase(),
    }).lean();

    let user = await User.findOne({ email: product.user }).lean();
    for (let category of req.body.categoryName) {
        category = await Category.findOne({ categoryName: category }).lean();
        categories.push(category._id);
    }
    if (!user || !type || categories.length === 0)
        return responseService(res, 404, message.NOT_FOUND);

    categories = Product.generateCategoryIdArray(categories);

    let newProduct = {
        typeId: type._id,
        userId: user._id,
        categoryId: categories,
        ...req.body,
    };

    product = Product.createProduct(newProduct);

    await product.save();

    responseService(res, 200, message.CREATED, product);
};

productController.deleteProductById = async (req, res) => {
    let product = await Product.findByIdAndDelete({
        _id: req.params.id,
    }).lean();
    if (!product) return responseService(res, 404, message.NOT_FOUND);
    responseService(res, 200, message.DELETED, product);
};

module.exports = productController;
