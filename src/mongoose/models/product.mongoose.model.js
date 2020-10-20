const mongoose = require("mongoose")

const productStatus = {
    'accept': 1,
    'waiting': 0,
    'decline': 2,
}

const ProductSchema = new mongoose.Schema(
    {
        type: {
            type: mongoose.Types.ObjectId,
            required: true,
        },
        user: {
            type: mongoose.Types.ObjectId,
            required: true,
        },
        productName: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
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
        description: String,
        productImageUrl: {
            type: String,
            required: true
        }
    },
    {
        toJSON: {virtuals: true},
        timestamps: true
    }
)

ProductSchema.virtual('getType', {
    ref: 'category',
    localField: 'type',
    foreignField: '_id',
})

ProductSchema.virtual('getUser', {
    ref: 'user',
    localField: 'user',
    foreignField: '_id',
    options: {
        sort: {email: -1}
    }
})

const Product = mongoose.model('product', ProductSchema);

module.exports = {
    Product
}
