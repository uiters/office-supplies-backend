const mongoose = require("mongoose");

const TypeSchema = new mongoose.Schema(
    {
        typeName: {
            type: String,
            required: true,
            unique: true,
        },
    },
    { toJSON: { virtuals: true }, timestamps: true }
);

TypeSchema.virtual("getProduct", {
    ref: "product",
    localField: "_id",
    foreignField: "productType",
});

TypeSchema.virtual("getCategory", {
    ref: "category",
    localField: "_id",
    foreignField: "categoryType",
});

TypeSchema.pre("find", function (next) {
    this.populate({
        path: "getCategory",
        select: "categoryName -_id -categoryType",
    }).populate({
        path: "getProduct",
        select: "productName -_id",
    });
    next();
});

TypeSchema.pre("save", function (next) {
    this.typeName = this.typeName.toLowerCase();
    next();
});

TypeSchema.statics.createType = function (type) {
    return new Type({
        typeName: type.typeName,
    });
};

const Type = mongoose.model("type", TypeSchema);

module.exports = {
    Type,
};
