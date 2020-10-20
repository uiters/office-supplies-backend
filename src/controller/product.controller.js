const responseService = require("../services/response.service");
const message = require("../constants/response.const");
const {User} = require("../mongoose/models/user.mongoose.model");
const {Category} = require("../mongoose/models/category.mongoose.model");
const {Product} = require("../mongoose/models/product.mongoose.model");


const productController = {}

productController.getAllProducts = async (req, res) => {
    let products = await Product.find().populate({
        path: 'getType',
        select: 'categoryName category'
    }).lean();
    responseService(res, 200, message.SUCCESS, products)
}

productController.getProductById = async (req, res) => {
    let product = await Product.findById({_id: req.params.id})
        .populate('getType', 'categoryName category')
        .populate('getUser')
        .lean();
    if (!product) return responseService(res, 404, message.NOT_FOUND)
    responseService(res, 200, message.SUCCESS, product)
}

productController.createProduct = async (req, res) => {
    let product = req.body
    let category = await Category.findOne({_id: product.type});
    let user = await User.findOne({_id: product.user});
    if (!user || !category) return responseService(res, 404, message.NOT_FOUND)

    product = new Product({
        type: category._id,
        user: user._id,
        productName: product.productName,
        price: product.price,
        status: product.status | 0,
        description: product.description,
        productImageUrl: product.productImageUrl | 'https://cdn.dumpaday.com/wp-content/uploads/2018/09/photos-21-3.jpg'
    })

    try {
        await product.save();
        responseService(res, 200, message.CREATED, product)
    } catch (e) {
        console.log(e);
    }
}

productController.deleteProductById = async (req, res) => {
    let product = await Product.findByIdAndDelete({_id: req.params.id});
    if (!product) return responseService(res, 404, message.NOT_FOUND)
    responseService(res, 200, message.DELETED, product);
}


// productController.getProductByKeyWord = async (req, res) => {
//     console.log(req.query.keyword)
//     responseService(res, 200, message.SUCCESS, req.query.keyword)
// }

// productController.getProductSort = async (req, res) => {
//     console.log(req.query.sort)
// }

module.exports = productController
