const mongoose = require("mongoose")

const StorageSchema = mongoose.Schema({
    product: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }],
    quantity: {
        type: Number,
        required: true
    }
})



const Storage = mongoose.model('storage', StorageSchema)