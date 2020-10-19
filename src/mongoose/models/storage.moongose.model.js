const mongoose = require("mongoose");

const StorageSchema = new mongoose.Schema(
    {
        storageName: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    {
        toJSON: {virtuals: true}
    }
);

StorageSchema.virtual("products", {
    ref: "Product",
    localField: "_id",
    foreignField: "storage",
    justOne: false,
    options: {sort: {productName: -1}},
});

const Storage = mongoose.model("storage", StorageSchema);
