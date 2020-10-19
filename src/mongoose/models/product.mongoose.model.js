const mongoose = require("mongoose")

const productStatus = {
    'accept': 1,
    'waiting': 0,
    'decline': 2,
}

const ProductSchema = new mongoose.Schema({
    type: String,
    user: mongoose.Types.ObjectId,
    productName: String,
    price: Number,
    productDetails: Object,
    status: {
        type: Number,
        required: [true, 'status is required'],
        validate: {
            validator: (status) => {
                return Object.values(productStatus).includes(status)
            }
        }
    },
    storage: mongoose.Types.ObjectId,
    description: String
})



const Product = mongoose.model('product', ProductSchema);