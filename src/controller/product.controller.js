const responseService = require("../services/response.service");
const message = require("../constants/response.const");
const { User } = require("../mongoose/models/user.mongoose.model");
const { Category } = require("../mongoose/models/category.mongoose.model");
const { Product } = require("../mongoose/models/product.mongoose.model");

const productController = {};

productController.getAllProducts = async (req, res) => {
    let products = await Product.find().lean();
    responseService(res, 200, message.SUCCESS, products);
};

productController.getProductById = async (req, res) => {
    let product = await Product.findById({ _id: req.params.id }).lean();
    if (!product) return responseService(res, 404, message.NOT_FOUND);
    responseService(res, 200, message.SUCCESS, product);
};

productController.getProductByName = async (req, res) => {
    let product = await Product.find().lean().byProductName(req.query.name);
    if (product.length === 0)
        return responseService(res, 404, message.NOT_FOUND);
    responseService(res, 200, message.SUCCESS, product);
};

productController.getProductByType = async (req, res) => {
    let typeId = await Category.findOne({categoryName: req.query.type});
    if(!typeId) return responseService(res, 404, message.NOT_FOUND);
    let product = await Product.find().byProductTypeId(typeId._id);
    if (product.length === 0)
        return responseService(res, 404, message.NOT_FOUND);
    responseService(res, 200, message.SUCCESS, product);
};

productController.createProduct = async (req, res) => {
    let product = req.body;
    let category = await Category.findOne({ _id: product.type }).lean();;
    let user = await User.findOne({ _id: product.user }).lean();;
    if (!user || !category) return responseService(res, 404, message.NOT_FOUND);

    product = new Product({
        type: category._id,
        user: user._id,
        productName: product.productName,
        price: product.price,
        status: product.status | 0,
        description: product.description,
        productImageUrl: product.productImageUrl
            ? product.productImageUrl
            : "https://cdn.dumpaday.com/wp-content/uploads/2018/09/photos-21-3.jpg",
    });

    await product.save();
    responseService(res, 200, message.CREATED, product);
};

productController.deleteProductById = async (req, res) => {
    let product = await Product.findByIdAndDelete({ _id: req.params.id }).lean();
    if (!product) return responseService(res, 404, message.NOT_FOUND);
    responseService(res, 200, message.DELETED, product);
};

module.exports = productController;
