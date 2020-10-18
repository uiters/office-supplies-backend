const mongoose = require('mongoose')


const CategorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
    },
    subCategory: {
        type: Array
    },
})

const Category = mongoose.model('category', CategorySchema)

module.exports = {
    Category
}
