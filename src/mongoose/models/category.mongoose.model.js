const mongoose = require('mongoose')


const CategorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
    },
    subCategory: {
        type: [String],
        index: true
    },
})

CategorySchema.pre('save', function (next) {
    this.categoryName = this.categoryName.toLowerCase();
    next();
})

const Category = mongoose.model('category', CategorySchema)

module.exports = {
    Category
}
