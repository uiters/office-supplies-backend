const {User} = require("../mongoose/models/user.mongoose.model");
const {Product} = require("../mongoose/models/product.mongoose.model");
const {Category} = require("../mongoose/models/category.mongoose.model");
const router = require("express").Router();

/*
 @GET: Get all products
 */

router.get("/", async (req, res) => {
    let products = await Product.find().sort({productName: 1});
    res.status(200).send(products);
})

/*
 @GET: Get product by ID
 */

router.get("/:id", async (req, res) => {
    let product = await Product.findById({_id: req.params.id})
    if (!product) return res.status(404).send({
        message: 'Product not found'
    });
    let user = await User.findById({_id: product.user}).select('email');
    let type = await Category.findById({_id: product.type}).select('categoryName')

    res.status(200).send({
        message: 'success',
        product
    })

})

/*
/ @ POST: Create Product
 */

router.post('/', async (req, res) => {
    let product = req.body
    let category = await Category.findOne({_id: product.type});
    if (!category) return res.status(404).send({
        message: 'type not found'
    })
    let user = await User.findOne({_id: product.user});
    if (!user) return res.status(404).send({
        message: 'user not found'
    })

    product = new Product({
        type: category._id,
        user: user._id,
        productName: product.name,
        price: product.price,
        status: product.status | 0,
        description: product.description
    })

    try {
        await product.save();
        res.status(201).send({
            message: 'product has been created',
            product: {
                ...product,
                status: product.status
            }
        })
    } catch (e) {
        console.log(e);
    }
})

/*
/ @ PUT: Delete product
 */

router.put("/deleteproduct", async (req, res) => {
    let product = await Product.findByIdAndDelete({_id: req.body.id});
    if (!product) return res.status(404).send({
        message: 'product not found'
    })

    res.status(200).send({
        message: `product with ${product._id} has been deleted`,
        product
    })
})

module.exports = router
