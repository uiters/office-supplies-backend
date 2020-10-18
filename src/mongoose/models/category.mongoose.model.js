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

const Category = mongoose.model('category', CategorySchema)

module.exports = {
    Category
}
