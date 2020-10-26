const mongoose = require("mongoose");

const productStatus = {
    accept: 1,
    waiting: 0,
    decline: 2,
};

const ProductSchema = new mongoose.Schema(
    {
        productType: {
            type: mongoose.Types.ObjectId,
            required: [true, "type is required"],
        },
        user: {
            type: mongoose.Types.ObjectId,
            required: [true, "user is required"],
        },
        productName: {
            type: String,
            required: true,
        },
        productCategory: [
            {
                type: mongoose.Types.ObjectId,
                required: [true, "category is required"],
            },
        ],
        price: {
            type: Number,
            required: [true, "price is required"],
        },
        productDetails: Object,
        status: {
            type: Number,
            required: [true, "status is required"],
            validate: {
                validator: (status) => {
                    return Object.values(productStatus).includes(status);
                },
            },
        },
        storage: mongoose.Types.ObjectId,
        description: String,
        productImageUrl: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        }
    },
    {
        toJSON: { virtuals: true },
        timestamps: true,
    }
);

ProductSchema.virtual("getType", {
    ref: "type",
    localField: "productType",
    foreignField: "_id",
});

ProductSchema.virtual("getUser", {
    ref: "user",
    localField: "user",
    foreignField: "_id",
    options: {
        sort: { email: -1 },
    },
});

ProductSchema.virtual("getCategory", {
    ref: "category",
    localField: "productCategory",
    foreignField: "_id",
});

ProductSchema.query.byProductName = function (productName) {
    return this.where({ productName: new RegExp(productName, "i") });
};

ProductSchema.query.byProductTypeId = function (id) {
    return this.where({ type: id });
};

ProductSchema.statics.generateCategoryIdArray = function (categories) {
    let res = [];
    for (const category of categories) {
        res.push(category);
    }
    return res;
};

ProductSchema.statics.createProduct = function (newProduct) {
    return (product = new Product({
        productType: newProduct.typeId, //Object ID
        user: newProduct.userId, //Object ID
        productCategory: [...newProduct.categoryId], //Array of Object ID
        productName: newProduct.productName,
        price: newProduct.price,
        status: newProduct.status | 0,
        description: newProduct.description,
        productImageUrl: newProduct.productImageUrl
            ? newProduct.productImageUrl
            : "https://cdn.dumpaday.com/wp-content/uploads/2018/09/photos-21-3.jpg",
        quantity: newProduct.productQuantity | 1
    }));
};

ProductSchema.pre("find", function (next) {
    this.populate({
        path: "getCategory",
        select: "categoryName -_id",
    });
    next();
});

const Product = mongoose.model("product", ProductSchema);

module.exports = {
    Product,
};
