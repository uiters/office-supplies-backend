const message = require("../constants/response.const");
const { Category } = require("../mongoose/models/category.mongoose.model");
const responseService = require("../services/response.service");

const categoryController = {};

categoryController.getCategory = async (req, res) => {
    let category = await Category.find().lean();
    responseService(res, 200, message.SUCCESS, category);
};

categoryController.createCategory = async (req, res) => {
    console.log(req.body);
    let category = Category.createCategory(req.body);
    await category.save();
    responseService(res, 201, message.SUCCESS, category);
};

categoryController.createManyCategory = async (req, res) => {
    let categoryArray = [...req.body];
    let categories = await Category.insertMany(categoryArray);
    if(!categories) responseService(res);
    responseService(res, 201, message.CREATED, categories);
}

categoryController.updateCategory = async (req, res) => {
    let category = await Category.findByIdAndUpdate(
        { _id: req.params.id },
        {
            categoryName: req.body.categoryName,
        },
        { new: true }
    );
    if (!category) return responseService(res, 404, message.NOT_FOUND);
    responseService(res, 200, message.UPDATED, category);
};

categoryController.deleteCategory = async (req, res) => {
    let category = await Category.findByIdAndDelete({_id: req.params.id});
    if(!category) responseService(res, 404, message.NOT_FOUND);
    responseService(res, 200, message.DELETED, category);
}

module.exports = categoryController