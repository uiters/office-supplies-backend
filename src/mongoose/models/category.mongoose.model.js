const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: [true, 'category name is required'],
        unique: true,
    },
    categoryType: {
        type: mongoose.Types.ObjectId,
        required: [true, 'category type is required']
    },
})

categorySchema.pre('save', function(next){
    this.categoryName = this.categoryName.toLowerCase();
    next();
})

categorySchema.statics.createCategory = function (category) {
    return new Category({
        categoryName: category.categoryName,
        categoryType: category.categoryType,
    })
}

const Category = mongoose.model('category', categorySchema);

module.exports = {
    Category
}