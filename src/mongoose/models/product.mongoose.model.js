const mongoose = require("mongoose");

const productStatus = {
  accept: 1,
  waiting: 0,
  decline: 2
};

const ProductSchema = new mongoose.Schema(
  {
    type: {
      type: mongoose.Types.ObjectId,
      required: true
    },
    user: {
      type: mongoose.Types.ObjectId,
      required: true
    },
    productName: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    },
    productDetails: Object,
    status: {
      type: Number,
      required: [true, "status is required"],
      validate: {
        validator: status => {
          return Object.values(productStatus).includes(status);
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
    toJSON: { virtuals: true },
    timestamps: true
  }
);

ProductSchema.virtual("getType", {
  ref: "category",
  localField: "type",
  foreignField: "_id"
});

ProductSchema.virtual("getUser", {
  ref: "user",
  localField: "user",
  foreignField: "_id",
  options: {
    sort: { email: -1 }
  }
});

ProductSchema.query.byProductName = function(productName) {
  return this.where({ productName: new RegExp(productName, "i") });
};

ProductSchema.query.byProductTypeId = function(id) {
  return this.where({ type: id });
};

ProductSchema.statics.createProduct = function(newProduct) {
  return product = new Product({
    type: newProduct.categoryId,
    user: newProduct.userId,
    productName: newProduct.productName,
    price: newProduct.price,
    status: newProduct.status | 0,
    description: newProduct.description,
    productImageUrl: newProduct.productImageUrl
      ? newProduct.productImageUrl
      : "https://cdn.dumpaday.com/wp-content/uploads/2018/09/photos-21-3.jpg"
  });
};

ProductSchema.pre("find", function(next) {
  this.populate({
    path: "getType",
    select: "categoryName -_id"
  }).populate({
    path: "getUser",
    select: "email -_id"
  });
  next();
});

const Product = mongoose.model("product", ProductSchema);

module.exports = {
  Product
};
